import algosdk, {Algodv2, ALGORAND_MIN_TX_FEE, Transaction} from "algosdk";

import {
  InitiatorSigner,
  SignerTransaction,
  SupportedNetwork
} from "../../util/commonTypes";
import {encodeString, isAlgo, waitForConfirmation} from "../../util/util";
import TinymanError from "../../util/error/TinymanError";
import {LIQUIDITY_TOKEN_UNIT_NAME} from "../../util/asset/assetConstants";
import {PoolInfo} from "../../util/pool/poolTypes";
import {getPoolInfo} from "../../util/pool/poolUtils";
import {getPoolAccountMinBalance} from "../common/utils";
import {getValidatorAppID} from "../../validator";
import {CONTRACT_VERSION} from "../../contract/constants";
import {TinymanAnalyticsApiAsset} from "../../util/asset/assetModels";
import {prepareAssetPairData, sortAssetIds} from "../../util/asset/assetUtils";
import {V1_1BootstrapTxnGroupIndices, V1_BOOTSTRAP_TXN_COUNT} from "./constants";
import {tinymanContract_v1_1} from "../../contract/v1_1/contract";

async function generateTxns({
  client,
  network,
  asset_1,
  asset_2,
  initiatorAddr
}: {
  client: Algodv2;
  network: SupportedNetwork;
  asset_1: Pick<TinymanAnalyticsApiAsset, "id" | "unit_name">;
  asset_2: Pick<TinymanAnalyticsApiAsset, "id" | "unit_name">;
  initiatorAddr: string;
}): Promise<SignerTransaction[]> {
  const suggestedParams = await client.getTransactionParams().do();
  // Make sure asset1 has greater ID
  const {
    asset1: {id: asset1ID, unitName: asset1UnitName},
    asset2: {id: asset2ID, unitName: asset2UnitName}
  } = prepareAssetPairData(asset_1, asset_2);
  const isAlgoPool = isAlgo(asset2ID);
  const validatorAppID = getValidatorAppID(network, CONTRACT_VERSION.V1_1);
  const poolLogicSig = tinymanContract_v1_1.generateLogicSigAccountForPool({
    network,
    asset1ID,
    asset2ID
  });
  const poolAddress = poolLogicSig.address();

  const validatorAppCallTxn = algosdk.makeApplicationOptInTxnFromObject({
    from: poolAddress,
    appIndex: validatorAppID,
    appArgs: [
      encodeString("bootstrap"),
      algosdk.encodeUint64(asset1ID),
      algosdk.encodeUint64(asset2ID)
    ],
    foreignAssets: isAlgoPool ? [asset1ID] : [asset2ID],
    suggestedParams
  });

  const liquidityTokenCreateTxn = algosdk.makeAssetCreateTxnWithSuggestedParamsFromObject(
    {
      from: poolAddress,
      total: 0xffffffffffffffffn,
      decimals: 6,
      defaultFrozen: false,
      unitName: LIQUIDITY_TOKEN_UNIT_NAME.DEFAULT,
      assetName: `TinymanPool1.1 ${asset1UnitName}-${asset2UnitName}`,
      assetURL: "https://tinyman.org",
      suggestedParams
    }
  );

  const asset1Optin = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
    from: poolAddress,
    to: poolAddress,
    assetIndex: asset1ID,
    amount: 0,
    suggestedParams
  });

  const fundingTxn = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
    from: initiatorAddr,
    to: poolAddress,
    amount: getBootstrapFundingTxnAmount(isAlgoPool),
    suggestedParams
  });

  let txns: Transaction[] = [];

  txns[V1_1BootstrapTxnGroupIndices.FUNDING_TXN] = fundingTxn;
  txns[V1_1BootstrapTxnGroupIndices.VALIDATOR_APP_CALL] = validatorAppCallTxn;
  txns[V1_1BootstrapTxnGroupIndices.LIQUIDITY_TOKEN_CREATE] = liquidityTokenCreateTxn;
  txns[V1_1BootstrapTxnGroupIndices.ASSET1_OPT_IN] = asset1Optin;

  if (!isAlgoPool) {
    txns[V1_1BootstrapTxnGroupIndices.ASSET2_OPT_IN] =
      algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
        from: poolAddress,
        to: poolAddress,
        assetIndex: asset2ID,
        amount: 0,
        suggestedParams
      });
  }

  const txGroup = algosdk.assignGroupID(txns);

  let finalSignerTxns: SignerTransaction[] = [
    {
      txn: txGroup[V1_1BootstrapTxnGroupIndices.FUNDING_TXN],
      signers: [initiatorAddr]
    },
    {
      txn: txGroup[V1_1BootstrapTxnGroupIndices.VALIDATOR_APP_CALL],
      signers: [poolAddress]
    },
    {
      txn: txGroup[V1_1BootstrapTxnGroupIndices.LIQUIDITY_TOKEN_CREATE],
      signers: [poolAddress]
    },
    {
      txn: txGroup[V1_1BootstrapTxnGroupIndices.ASSET1_OPT_IN],
      signers: [poolAddress]
    }
  ];

  if (txGroup[V1_1BootstrapTxnGroupIndices.ASSET2_OPT_IN]) {
    finalSignerTxns.push({
      txn: txGroup[V1_1BootstrapTxnGroupIndices.ASSET2_OPT_IN],
      signers: [poolAddress]
    });
  }

  return finalSignerTxns;
}

function getBootstrapFundingTxnAmount(isAlgoPool: boolean) {
  return (
    getPoolAccountMinBalance(CONTRACT_VERSION.V1_1, isAlgoPool) +
    getBootstrapProcessTxnCount(isAlgoPool) * ALGORAND_MIN_TX_FEE
  );
}

function getBootstrapProcessTxnCount(isAlgoPool: boolean) {
  return isAlgoPool ? V1_BOOTSTRAP_TXN_COUNT.ASA_ALGO : V1_BOOTSTRAP_TXN_COUNT.ASA_ASA;
}

async function signTxns({
  txGroup,
  network,
  initiatorSigner,
  asset1ID,
  asset2ID
}: {
  txGroup: SignerTransaction[];
  network: SupportedNetwork;
  initiatorSigner: InitiatorSigner;
  asset1ID: number;
  asset2ID: number;
}): Promise<{signedTxns: Uint8Array[]; txnIDs: string[]}> {
  const [signedFundingTxn] = await initiatorSigner([txGroup]);

  // Make sure asset1 has greater ID
  const [sortedAsset1ID, sortedAsset2ID] = sortAssetIds(asset1ID, asset2ID);

  const poolLogicSig = tinymanContract_v1_1.generateLogicSigAccountForPool({
    network,
    asset1ID: sortedAsset1ID,
    asset2ID: sortedAsset2ID
  });

  const txnIDs: string[] = [];
  const signedTxns = txGroup.map((txDetail, index) => {
    if (index === V1_1BootstrapTxnGroupIndices.FUNDING_TXN) {
      txnIDs.push(txDetail.txn.txID().toString());
      return signedFundingTxn;
    }
    const {txID, blob} = algosdk.signLogicSigTransactionObject(
      txDetail.txn,
      poolLogicSig
    );

    txnIDs.push(txID);
    return blob;
  });

  return {signedTxns, txnIDs};
}

async function doBootstrap({
  client,
  signedTxns,
  txnIDs
}: {
  client: Algodv2;
  signedTxns: Uint8Array[];
  txnIDs: string[];
}): Promise<{liquidityTokenID: number}> {
  try {
    await client.sendRawTransaction(signedTxns).do();

    const assetCreationResult = await waitForConfirmation(
      client,
      txnIDs[V1_1BootstrapTxnGroupIndices.LIQUIDITY_TOKEN_CREATE]
    );

    const liquidityTokenID = assetCreationResult["asset-index"];

    if (typeof liquidityTokenID !== "number") {
      throw new Error(`Generated ID is not valid: got ${liquidityTokenID}`);
    }

    return {
      liquidityTokenID
    };
  } catch (error: any) {
    throw new TinymanError(
      error,
      "We encountered something unexpected while bootstraping the pool. Try again later."
    );
  }
}

/**
 * Create an pool for an asset pair if it does not already exist. The initiator will provide
 * funding to create the pool and pay for the creation transaction fees.
 */
async function execute({
  client,
  network,
  pool: {asset1ID, asset2ID},
  signedTxns,
  txnIDs
}: {
  client: Algodv2;
  network: SupportedNetwork;
  pool: {asset1ID: number; asset2ID: number};
  signedTxns: Uint8Array[];
  txnIDs: string[];
}): Promise<PoolInfo> {
  await doBootstrap({client, signedTxns, txnIDs});

  return getPoolInfo({
    client,
    network,
    contractVersion: CONTRACT_VERSION.V1_1,
    asset1ID,
    asset2ID
  });
}

export const BootstrapV1_1 = {
  generateTxns,
  signTxns,
  execute,
  getBootstrapFundingTxnAmount
};
