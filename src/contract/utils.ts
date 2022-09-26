import {LogicSigAccount} from "algosdk";
import {toByteArray} from "base64-js";

import {PoolLogicSigVariables} from "./contract";

interface GenerateLogicSigAccountForPoolParams {
  validatorAppID: number;
  asset1ID: number;
  asset2ID: number;
  poolLogicSigContractTemplate: string;
  templateVariables: PoolLogicSigVariables;
}

function generateLogicSigAccountForV1_1Pool(
  params: GenerateLogicSigAccountForPoolParams
): LogicSigAccount {
  const {validatorAppID, poolLogicSigContractTemplate, templateVariables} = params;
  let {asset1ID, asset2ID} = params;

  if (asset1ID === asset2ID) {
    throw new Error("Assets are the same");
  }

  if (asset2ID > asset1ID) {
    const tmp = asset1ID;

    asset1ID = asset2ID;
    asset2ID = tmp;
  }

  let programArray = Array.from(toByteArray(poolLogicSigContractTemplate));

  const variables = {
    asset_id_1: asset1ID,
    asset_id_2: asset2ID,
    validator_app_id: validatorAppID
  };

  let offset = 0;

  templateVariables.sort((a, b) => a.index - b.index);
  for (let i = 0; i < templateVariables.length; i++) {
    const v = templateVariables[i];
    let name = v.name.split("TMPL_")[1].toLowerCase();
    let value = variables[name];
    let start = v.index - offset;
    let end = start + v.length;
    // All of the template variables are ints
    let value_encoded = encodeVarInt(value);
    let diff = v.length - value_encoded.length;

    offset += diff;

    programArray = programArray
      .slice(0, start)
      .concat(value_encoded)
      .concat(programArray.slice(end));
  }

  const program = new Uint8Array(programArray);

  return new LogicSigAccount(program);
}

//  TODO: Update function for V2
function generateLogicSigAccountForV2Pool(params: GenerateLogicSigAccountForPoolParams) {
  let {validatorAppID, poolLogicSigContractTemplate, templateVariables} = params;
  let {asset1ID, asset2ID} = params;

  if (asset1ID === asset2ID) {
    throw new Error("Assets are the same");
  }

  if (asset2ID > asset1ID) {
    const tmp = asset1ID;

    asset1ID = asset2ID;
    asset2ID = tmp;
  }

  let programArray = Array.from(toByteArray(poolLogicSigContractTemplate));

  const variables = {
    asset_id_1: asset1ID,
    asset_id_2: asset2ID,
    validator_app_id: validatorAppID
  };

  let offset = 0;

  templateVariables.sort((a, b) => a.index - b.index);
  for (let i = 0; i < templateVariables.length; i++) {
    const v = templateVariables[i];
    let name = v.name.split("TMPL_")[1].toLowerCase();
    let value = variables[name];
    let start = v.index - offset;
    let end = start + v.length;
    // All of the template variables are ints
    let value_encoded = encodeVarInt(value);
    let diff = v.length - value_encoded.length;

    offset += diff;

    programArray = programArray
      .slice(0, start)
      .concat(value_encoded)
      .concat(programArray.slice(end));
  }

  const program = new Uint8Array(programArray);

  const lsig = new LogicSigAccount(program);

  return lsig;
}

function encodeVarInt(number) {
  let buf: number[] = [];

  // eslint-disable-next-line no-constant-condition
  while (true) {
    let towrite = number & 0x7f;

    number >>= 7;

    if (number) {
      buf.push(towrite | 0x80);
    } else {
      buf.push(towrite);
      break;
    }
  }
  return buf;
}

export {
  generateLogicSigAccountForV1_1Pool,
  generateLogicSigAccountForV2Pool,
  GenerateLogicSigAccountForPoolParams
};

/* eslint
      no-param-reassign: "off",
      no-bitwise: "off",
      prefer-destructuring: "off"
*/
