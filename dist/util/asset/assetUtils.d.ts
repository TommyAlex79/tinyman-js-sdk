import { SignerTransaction } from "../commonTypes";
export declare function generateOptIntoAssetTxns({ client, assetID, initiatorAddr }: {
    client: any;
    assetID: any;
    initiatorAddr: any;
}): Promise<SignerTransaction[]>;
/**
 * @returns Array of given asset ids, bigger first
 */
export declare function sortAssetIds(asset1ID: number, asset2ID: number): number[];
export declare function isAlgo(id: number | bigint): boolean;
