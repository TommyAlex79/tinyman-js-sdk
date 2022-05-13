"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var t=require("algosdk"),e=require("base64-js");function s(t){return t&&"object"==typeof t&&"default"in t?t:{default:t}}var n=s(t);const a=Uint8Array.from([1]),o="- would result negative",i="logic eval error:",r="exceeds schema integer count",u=/transaction \w+:/;class c extends Error{constructor(t,e,...s){super(...s);const n=this.extractMessageFromAlgoSDKError(t);this.data=t,this.type=this.getErrorType(n),this.setMessage(this.getErrorMessage(n,this.type,e))}setMessage(t){this.message=t}getErrorType(t){let e="Unknown";return t.includes(o)?e="SlippageTolerance":t.includes(r)?e="ExceedingExcessAmountCount":t.includes(i)?e="LogicError":t.match(u)&&(e="TransactionError"),e}getErrorMessage(t,e,s){let n;switch(e){case"SlippageTolerance":n="The process failed due to too much slippage in the price. Please adjust the slippage tolerance and try again.";break;case"ExceedingExcessAmountCount":n="The process failed due to the number of excess amounts accumulated for your account in the Tinyman app.";break;case"LogicError":n=t.split(i)[1];break;case"TransactionError":n=t.split(u)[1];break;case"Unknown":t&&(n=t)}return n||(n=s||"We encountered an unexpected error, try again later."),n.trim()}extractMessageFromAlgoSDKError(t){let e="";return t?.response?.body?.message?e=t.response.body.message:t?.response?.text?e=t.response.text:"string"==typeof t?.message&&(e=this.isMessageObjectString(t?.message)?JSON.parse(t.message||"{message: ''}").message:t.message),"string"!=typeof e&&(e=String(e)),e}isMessageObjectString(t){return"string"==typeof t&&t.includes("{message:")}}function d(t=[]){const e={};for(const s of t){const{key:t}=s;let n;if(1==s.value.type)n=s.value.bytes;else{if(2!=s.value.type)throw new Error(`Unexpected state type: ${s.value.type}`);n=s.value.uint}e[t]=n}return e}function A(t){let e=t.reduce(((t,e)=>t+e.length),0),s=new Uint8Array(e),n=0;for(let e of t)s.set(e,n),n+=e.length;return s}const l=100000n,I=100000n,g=100000n,p=25000n+25000n,m=25000n+3500n;function T(t){return new Promise((e=>{setTimeout((()=>{e(null)}),t)}))}async function E(t,e){for(;;){await T(1e3);let s=null;try{s=await t.pendingTransactionInformation(e).do()}catch(t){}if(s){if(s["confirmed-round"])return s;if(s["pool-error"])throw new Error(`Transaction Rejected: ${s["pool-error"]}`)}}}function D(t,e,s){if(e>1||e<0)throw new Error(`Invalid slippage value. Must be between 0 and 1, got ${e}`);let n;try{const a="negative"===t?1-e:1+e;n=BigInt(Math.floor(Number(s)*a))}catch(t){throw new Error(t.message)}return n}function x(t,e){const s=Number(t);return f({decimalPlaces:s},Math.pow(10,-s)*Number(e))}function f({decimalPlaces:t=0},e){return Number(Math.round(Number(e+`e+${t}`))+`e-${t}`)}async function N(t,e){try{let s=[];for(let n of e){const{txId:e}=await t.sendRawTransaction(n).do(),a=(await E(t,e))["confirmed-round"];s.push({confirmedRound:a,txnID:e})}return s}catch(t){throw new c(t,"We encountered an error while processing this transaction. Try again later.")}}function y(t){return t.reduce(((t,e)=>t+e.txn.fee),0)}function S(t){return(e=t[0].txn.group)?Buffer.from(e).toString("base64"):"";var e}function _(t){return(new TextEncoder).encode(t)}const h={id:"0",name:"Algorand",unit_name:"ALGO",decimals:6,url:"https://algorand.org",is_liquidity_token:!1,total_amount:"6615503326932151"},w={DEFAULT:"TMPOOL11",V1:"TM1POOL"};function M(t){const e=t["apps-total-schema"];return 1e5+1e5*(t.assets||[]).length+1e5*(t["created-apps"]||[]).length+1e5*(t["apps-local-state"]||[]).length+5e4*(e&&e["num-byte-slice"]||0)+28500*(e&&e["num-uint"]||0)+1e5*(t["apps-total-extra-pages"]||0)}const B=_("e");async function R({client:s,pool:a,accountAddr:o}){const i=(await s.accountInformation(o).setIntDecoding(t.IntDecoding.BIGINT).do())["apps-local-state"]||[];let r=0n,u=0n,c=0n;for(const t of i){if(t.id!=a.validatorAppID)continue;const s=t["key-value"];if(!s)break;const o=d(s),i=e.fromByteArray(A([n.default.decodeAddress(a.addr).publicKey,B,n.default.encodeUint64(a.asset1ID)])),l=e.fromByteArray(A([n.default.decodeAddress(a.addr).publicKey,B,n.default.encodeUint64(a.asset2ID)])),I=e.fromByteArray(A([n.default.decodeAddress(a.addr).publicKey,B,n.default.encodeUint64(a.liquidityTokenID)])),g=o[i],p=o[l],m=o[I];"bigint"==typeof g&&(r=g),"bigint"==typeof p&&(u=p),"bigint"==typeof m&&(c=m)}const l={excessAsset1:r,excessAsset2:u,excessLiquidityTokens:c};if(l.excessAsset1<0n||l.excessAsset2<0n||l.excessLiquidityTokens<0n)throw new Error(`Invalid account excess: ${l}`);return l}var P={type:"logicsig",logic:{bytecode:"BCAIAQCBgICAgICAgPABgICAgICAgIDwAQMEBQYlJA1EMQkyAxJEMRUyAxJEMSAyAxJEMgQiDUQzAQAxABJEMwEQIQcSRDMBGIGCgICAgICAgPABEkQzARkiEjMBGyEEEhA3ARoAgAlib290c3RyYXASEEAAXDMBGSMSRDMBG4ECEjcBGgCABHN3YXASEEACOzMBGyISRDcBGgCABG1pbnQSQAE7NwEaAIAEYnVybhJAAZg3ARoAgAZyZWRlZW0SQAJbNwEaAIAEZmVlcxJAAnkAIQYhBSQjEk0yBBJENwEaARclEjcBGgIXJBIQRDMCADEAEkQzAhAhBBJEMwIhIxJEMwIiIxwSRDMCIyEHEkQzAiQjEkQzAiWACFRNUE9PTDExEkQzAiZRAA+AD1RpbnltYW5Qb29sMS4xIBJEMwIngBNodHRwczovL3RpbnltYW4ub3JnEkQzAikyAxJEMwIqMgMSRDMCKzIDEkQzAiwyAxJEMwMAMQASRDMDECEFEkQzAxElEkQzAxQxABJEMwMSIxJEJCMTQAAQMwEBMwIBCDMDAQg1AUIBsTMEADEAEkQzBBAhBRJEMwQRJBJEMwQUMQASRDMEEiMSRDMBATMCAQgzAwEIMwQBCDUBQgF8MgQhBhJENwEcATEAE0Q3ARwBMwQUEkQzAgAxABNEMwIUMQASRDMDADMCABJEMwIRJRJEMwMUMwMHMwMQIhJNMQASRDMDESMzAxAiEk0kEkQzBAAxABJEMwQUMwIAEkQzAQEzBAEINQFCAREyBCEGEkQ3ARwBMQATRDcBHAEzAhQSRDMDFDMDBzMDECISTTcBHAESRDMCADEAEkQzAhQzBAASRDMCESUSRDMDADEAEkQzAxQzAwczAxAiEk0zBAASRDMDESMzAxAiEk0kEkQzBAAxABNEMwQUMQASRDMBATMCAQgzAwEINQFCAJAyBCEFEkQ3ARwBMQATRDMCADcBHAESRDMCADEAE0QzAwAxABJEMwIUMwIHMwIQIhJNMQASRDMDFDMDBzMDECISTTMCABJEMwEBMwMBCDUBQgA+MgQhBBJENwEcATEAE0QzAhQzAgczAhAiEk03ARwBEkQzAQEzAgEINQFCABIyBCEEEkQzAQEzAgEINQFCAAAzAAAxABNEMwAHMQASRDMACDQBD0M=",address:"ABUKAXTANWR6K6ZYV75DWJEPVWWOU6SFUVRI6QHO44E4SIDLHBTD2CZ64A",size:881,variables:[{name:"TMPL_ASSET_ID_1",type:"int",index:15,length:10},{name:"TMPL_ASSET_ID_2",type:"int",index:5,length:10},{name:"TMPL_VALIDATOR_APP_ID",type:"int",index:74,length:10}],source:"https://github.com/tinymanorg/tinyman-contracts-v1/tree/dc9ab40c58b85c15d58f63a1507e18be76720dbb/contracts/pool_logicsig.teal.tmpl"},name:"pool_logicsig"},b={type:"app",approval_program:{bytecode:"BCAHAAHoB+UHBf///////////wHAhD0mDQFvAWUBcAJhMQJhMgJsdARzd2FwBG1pbnQBdAJjMQJwMQJjMgJwMjEZgQQSMRkhBBIRMRmBAhIRQATxMRkjEjEbIhIQQATjNhoAgAZjcmVhdGUSQATUMRkjEjYaAIAJYm9vdHN0cmFwEhBAA/MzAhIzAggINTQiK2I1ZSI0ZXAARDUBIicEYjVmNGZAABEiYCJ4CTEBCDMACAk1AkIACCI0ZnAARDUCIicFYjVnKDRlFlA1byI0b2I1PSg0ZhZQNXAiNHBiNT4oNGcWUDVxIjRxYjU/IipiNUA0ATQ9CTVHNAI0Pgk1SDEAKVA0ZRZQNXkxAClQNGYWUDV6MQApUDRnFlA1ezYaAIAGcmVkZWVtEkAAWjYaAIAEZmVlcxJAABw2GgAnBhI2GgAnBxIRNhoAgARidXJuEhFAAG0ANGdJRDMCERJEMwISRDMCFDIJEkQ0PzMCEgk1PzRAMwISCTVAIio0QGYiNHE0P2YjQzMCFDMCBzMCECMSTTYcARJENDREIigzAhEWUEpiNDQJZiMxAClQMwIRFlBKYjQ0CUlBAANmI0NIaCNDMgciJwhiCUk1+kEARiInCWIiJwpiNPodTEAANx4hBSMeHzX7SEhIIicLYiInDGI0+h1MQAAdHiEFIx4fNfxISEgiJwk0+2YiJws0/GYiJwgyB2YzAxIzAwgINTU2HAExABNENGdBACIiNGdwAEQ1BiIcNAYJND8INQQ2GgAnBhJAASA0ZzMEERJENhoAJwcSQABVNhwBMwQAEkQzBBI0Rx00BCMdH0hITEhJNRA0NAk1yTMEEjRIHTQEIx0fSEhMSEk1ETQ1CTXKNBA0ERBENEc0EAk1UTRINBEJNVI0BDMEEgk1U0ICCjYcATMCABJENEc0NAg1UTRINDUINVI0BCISQAAuNDQ0BB00RyMdH0hITEg0NTQEHTRIIx0fSEhMSEoNTUk0BAg1UzMEEgk1y0IBvyInBTMEEUk1Z2YoNGcWUDVxIjRncABERDRnNGUTRDRnNGYTRDMEEiQISR018DQ0NDUdNfFKDEAACBJENPA08Q5EMwQSJAgjCEkdNfA0NDQ1HTXxSg1AAAgSRDTwNPENRCQ1PzQEMwQSJAgINVNCAU82HAEzAgASRDMCETRlEjMDETRmEhBJNWRAABkzAhE0ZhIzAxE0ZRIQRDRINRI0RzUTQgAINEc1EjRINRM2GgGAAmZpEkAAWjYaAYACZm8SRDQ1JAs0Eh00EzQ1CSUdH0hITEgjCEk1FSINNDU0EwwQRDQ0NBUJNGRBABM1yTRHNBUINVE0SDQ1CTVSQgBnNco0SDQVCDVSNEc0NQk1UUIAVDQ0STUVJQs0Ex00EiQLNDQlCx4fSEhMSEk1FCINNBQ0EwwQRDQUNDUJNGRBABM1yjRHNDQINVE0SDQUCTVSQgATNck0RzQUCTVRNEg0NAg1UkIAADQVIQQLNAQdgaCcATQSHR9ISExISTUqNAQINVNCADsiKzYaARdJNWVmIicENhoCF0k1ZmY0ZXEDRIABLVCABEFMR080ZkEABkg0ZnEDRFAzAiZJFYEPTFISQyIqNEA0KghmIjRxND80Kgg0ywhmIjRvND00yQhmIjRwND40yghmIoACczE0UWYigAJzMjRSZiInCjRSIQYdNFEjHR9ISExIZiInDDRRIQYdNFIjHR9ISExIZiKAA2lsdDRTZjTLQQAJIzR7SmI0ywhmNMlBAAkjNHlKYjTJCGY0ykEACSM0ekpiNMoIZiNDI0MiQw==",address:"BUQHXHPLMYUVS3P2INJ2EUJFCSNT6LNUGXVM6T2SZ27TDRDYLUMWCFYW3E",size:1351,variables:[],source:"https://github.com/tinymanorg/tinyman-contracts-v1/tree/dc9ab40c58b85c15d58f63a1507e18be76720dbb/contracts/validator_approval.teal"},clear_program:{bytecode:"BIEB",address:"P7GEWDXXW5IONRW6XRIRVPJCT2XXEQGOBGG65VJPBUOYZEJCBZWTPHS3VQ",size:3,variables:[],source:"https://github.com/tinymanorg/tinyman-contracts-v1/tree/dc9ab40c58b85c15d58f63a1507e18be76720dbb/contracts/validator_clear_state.teal"},global_state_schema:{num_uints:0,num_byte_slices:0},local_state_schema:{num_uints:16,num_byte_slices:0},name:"validator_app"};const Q=new class{constructor(t,s){this.poolLogicSigContractTemplate=s.logic.bytecode,this.templateVariables=s.logic.variables,this.validatorApprovalContract=e.toByteArray(t.approval_program.bytecode),this.validatorClearStateContract=e.toByteArray(t.clear_program.bytecode),this.schema={numLocalInts:t.local_state_schema.num_uints,numLocalByteSlices:t.local_state_schema.num_byte_slices,numGlobalInts:t.global_state_schema.num_uints,numGlobalByteSlices:t.global_state_schema.num_byte_slices}}getPoolLogicSig({validatorAppID:s,asset1ID:n,asset2ID:a}){if(n===a)throw new Error("Assets are the same");if(a>n){const t=n;n=a,a=t}let o=Array.from(e.toByteArray(this.poolLogicSigContractTemplate));const i={asset_id_1:n,asset_id_2:a,validator_app_id:s};let r=0;this.templateVariables.sort(((t,e)=>t.index-e.index));for(let t=0;t<this.templateVariables.length;t++){const e=this.templateVariables[t];let s=i[e.name.split("TMPL_")[1].toLowerCase()],n=e.index-r,a=n+e.length,u=C(s);r+=e.length-u.length,o=o.slice(0,n).concat(u).concat(o.slice(a))}const u=new Uint8Array(o);return{addr:new t.LogicSigAccount(u).address(),program:u}}}(b,P),O=Q.schema;function C(t){let e=[];for(;;){let s=127&t;if(!(t>>=7)){e.push(s);break}e.push(128|s)}return e}const k={testnet:62368684,mainnet:552635992};var U;async function L(t,e){const s=Q.getPoolLogicSig(e);let n={addr:s.addr,program:s.program,validatorAppID:e.validatorAppID,asset1ID:Math.max(e.asset1ID,e.asset2ID),asset2ID:Math.min(e.asset1ID,e.asset2ID),status:exports.PoolStatus.NOT_CREATED};const a=await J({client:t,address:s.addr,validatorAppID:e.validatorAppID});return a&&(n.asset1ID=a.asset1ID,n.asset2ID=a.asset2ID,n.liquidityTokenID=a.liquidityTokenID,n.status=exports.PoolStatus.READY),n}exports.PoolStatus=void 0,(U=exports.PoolStatus||(exports.PoolStatus={})).NOT_CREATED="not created",U.BOOTSTRAP="bootstrap",U.READY="ready",U.ERROR="error";const F=_("o"),X=0xffffffffffffffffn;function v(t,e){let s=Number(e)/Number(t);return Number.isFinite(s)||(s=0),s}const j={};async function J({client:t,address:e,validatorAppID:s},n=j){if(n[e])return n[e];const a=await t.accountInformation(e).do(),o=a["apps-local-state"].find((t=>t.id==s));let i=null;if(o){const t=d(o["key-value"]),s="YTE=",r="YTI=",u=a["created-assets"][0].index;i={asset1ID:t[s],asset2ID:t[r],liquidityTokenID:u},n[e]=i}return i}function q(t){return Boolean(t&&!(t.asset1+t.asset2))}var z,G;function Y(t,e){return 3e5+(0===t?0:1e5)+1e5+28500*Q.schema.numLocalInts+5e4*Q.schema.numLocalByteSlices+e.liquidityTokenCreateTxn+e.asset1OptinTxn+e.asset2OptinTxn+e.validatorAppCallTxn}!function(t){t[t.FUNDING_TXN=0]="FUNDING_TXN",t[t.VALIDATOR_APP_CALL=1]="VALIDATOR_APP_CALL",t[t.LIQUIDITY_TOKEN_CREATE=2]="LIQUIDITY_TOKEN_CREATE",t[t.ASSET1_OPT_IN=3]="ASSET1_OPT_IN",t[t.ASSET2_OPT_IN=4]="ASSET2_OPT_IN"}(z||(z={})),function(t){t[t.FEE_TXN=0]="FEE_TXN",t[t.VALIDATOR_APP_CALL_TXN=1]="VALIDATOR_APP_CALL_TXN",t[t.ASSET1_IN_TXN=2]="ASSET1_IN_TXN",t[t.ASSET2_IN_TXN=3]="ASSET2_IN_TXN",t[t.LIQUDITY_OUT_TXN=4]="LIQUDITY_OUT_TXN"}(G||(G={}));var W;!function(t){t[t.FEE_TXN=0]="FEE_TXN",t[t.VALIDATOR_APP_CALL_TXN=1]="VALIDATOR_APP_CALL_TXN",t[t.ASSET1_OUT_TXN=2]="ASSET1_OUT_TXN",t[t.ASSET2_OUT_TXN=3]="ASSET2_OUT_TXN",t[t.LIQUDITY_IN_TXN=4]="LIQUDITY_IN_TXN"}(W||(W={}));const V=3n,H=1000n;var Z,K;exports.SwapType=void 0,(Z=exports.SwapType||(exports.SwapType={})).FixedInput="fixed-input",Z.FixedOutput="fixed-output",function(t){t[t.FEE_TXN_INDEX=0]="FEE_TXN_INDEX",t[t.VALIDATOR_APP_CALL_TXN_INDEX=1]="VALIDATOR_APP_CALL_TXN_INDEX",t[t.ASSET_IN_TXN_INDEX=2]="ASSET_IN_TXN_INDEX",t[t.ASSET_OUT_TXN_INDEX=3]="ASSET_OUT_TXN_INDEX"}(K||(K={}));exports.ALGO_ASSET=h,exports.ALGO_ASSET_ID=0,exports.ASSET_OPT_IN_PROCESS_TXN_COUNT=1,exports.BASE_MINIMUM_BALANCE=1e5,exports.BURN_PROCESS_TXN_COUNT=5,exports.LIQUIDITY_TOKEN_UNIT_NAME=w,exports.MINIMUM_BALANCE_REQUIRED_PER_APP=1e5,exports.MINIMUM_BALANCE_REQUIRED_PER_ASSET=1e5,exports.MINIMUM_BALANCE_REQUIRED_PER_BYTE_SCHEMA=5e4,exports.MINIMUM_BALANCE_REQUIRED_PER_INT_SCHEMA_VALUE=28500,exports.MINIMUM_LIQUIDITY_MINTING_AMOUNT=1e3,exports.MINT_PROCESS_TXN_COUNT=5,exports.OPT_IN_VALIDATOR_APP_PROCESS_TXN_COUNT=1,exports.OPT_OUT_VALIDATOR_APP_PROCESS_TXN_COUNT=1,exports.REDEEM_PROCESS_TXN_COUNT=3,exports.SWAP_PROCESS_TXN_COUNT=4,exports.applySlippageToAmount=D,exports.burnLiquidity=async function({client:t,pool:e,txGroup:s,signedTxns:n,initiatorAddr:a}){try{const o=s[W.ASSET1_OUT_TXN].txn.amount,i=s[W.ASSET2_OUT_TXN].txn.amount,r=s[W.LIQUDITY_IN_TXN].txn.amount,u=await R({client:t,pool:e,accountAddr:a}),[{confirmedRound:c,txnID:d}]=await N(t,[n]),A=await R({client:t,pool:e,accountAddr:a});let l=A.excessAsset1-u.excessAsset1;l<0n&&(l=0n);let I=A.excessAsset2-u.excessAsset2;return I<0n&&(I=0n),{round:c,fees:y(s),asset1ID:e.asset1ID,asset1Out:BigInt(o)+l,asset2ID:e.asset2ID,asset2Out:BigInt(i)+I,liquidityID:e.liquidityTokenID,liquidityIn:BigInt(r),excessAmounts:[{assetID:e.asset1ID,excessAmountForBurning:l,totalExcessAmount:A.excessAsset1},{assetID:e.asset2ID,excessAmountForBurning:I,totalExcessAmount:A.excessAsset2}],txnID:d,groupID:S(s)}}catch(t){const e=new c(t,"We encountered something unexpected while burning liquidity. Try again later.");throw"SlippageTolerance"===e.type&&e.setMessage("The burn failed due to too much slippage in the price. Please adjust the slippage tolerance and try again."),e}},exports.calculateAccountMinimumRequiredBalance=M,exports.calculatePoolBootstrapFundingTxnAmount=Y,exports.convertFromBaseUnits=x,exports.convertToBaseUnits=function(t,e){return f({decimalPlaces:0},Math.pow(10,Number(t))*Number(e))},exports.createPool=async function(t,e,s,n){return await async function({client:t,signedTxns:e,txnIDs:s}){try{await t.sendRawTransaction(e).do();const n=(await E(t,s[z.LIQUIDITY_TOKEN_CREATE]))["asset-index"];if("number"!=typeof n)throw new Error(`Generated ID is not valid: got ${n}`);return{liquidityTokenID:n}}catch(t){throw new c(t,"We encountered something unexpected while bootstraping the pool. Try again later.")}}({client:t,signedTxns:s,txnIDs:n}),L(t,e)},exports.generateBootstrapTransactions=async function({client:t,validatorAppID:e,asset1ID:s,asset2ID:a,asset1UnitName:o,asset2UnitName:i,initiatorAddr:r}){const u=await t.getTransactionParams().do(),c=s>a?{asset1:{id:s,unitName:o},asset2:{id:a,unitName:i}}:{asset1:{id:a,unitName:i},asset2:{id:s,unitName:o}},d=Q.getPoolLogicSig({asset1ID:c.asset1.id,asset2ID:c.asset2.id,validatorAppID:e}),A=n.default.makeApplicationOptInTxnFromObject({from:d.addr,appIndex:e,appArgs:[_("bootstrap"),n.default.encodeUint64(c.asset1.id),n.default.encodeUint64(c.asset2.id)],foreignAssets:0==c.asset2.id?[c.asset1.id]:[c.asset1.id,c.asset2.id],suggestedParams:u}),l=n.default.makeAssetCreateTxnWithSuggestedParamsFromObject({from:d.addr,total:0xffffffffffffffffn,decimals:6,defaultFrozen:!1,unitName:w.DEFAULT,assetName:`TinymanPool1.1 ${c.asset1.unitName}-${c.asset2.unitName}`,assetURL:"https://tinyman.org",suggestedParams:u}),I=n.default.makeAssetTransferTxnWithSuggestedParamsFromObject({from:d.addr,to:d.addr,assetIndex:c.asset1.id,amount:0,suggestedParams:u}),g=0===c.asset2.id?null:n.default.makeAssetTransferTxnWithSuggestedParamsFromObject({from:d.addr,to:d.addr,assetIndex:c.asset2.id,amount:0,suggestedParams:u});let p=[n.default.makePaymentTxnWithSuggestedParamsFromObject({from:r,to:d.addr,amount:Y(c.asset2.id,{liquidityTokenCreateTxn:l.fee,asset1OptinTxn:I.fee,asset2OptinTxn:g?g.fee:0,validatorAppCallTxn:A.fee}),suggestedParams:u}),A,l,I];g&&p.push(g);const m=n.default.assignGroupID(p);let T=[{txn:m[0],signers:[r]},{txn:m[1],signers:[d.addr]},{txn:m[2],signers:[d.addr]},{txn:m[3],signers:[d.addr]}];return m[4]&&T.push({txn:m[4],signers:[d.addr]}),T},exports.generateBurnTxns=async function({client:t,pool:e,liquidityIn:s,asset1Out:o,asset2Out:i,slippage:r,initiatorAddr:u}){const c=await t.getTransactionParams().do(),d=n.default.makeApplicationNoOpTxnFromObject({from:e.addr,appIndex:e.validatorAppID,appArgs:[_("burn")],accounts:[u],foreignAssets:0==e.asset2ID?[e.asset1ID,e.liquidityTokenID]:[e.asset1ID,e.asset2ID,e.liquidityTokenID],suggestedParams:c}),A=D("negative",r,o),l=n.default.makeAssetTransferTxnWithSuggestedParamsFromObject({from:e.addr,to:u,assetIndex:e.asset1ID,amount:A,suggestedParams:c}),I=D("negative",r,i);let g;g=0===e.asset2ID?n.default.makePaymentTxnWithSuggestedParamsFromObject({from:e.addr,to:u,amount:I,suggestedParams:c}):n.default.makeAssetTransferTxnWithSuggestedParamsFromObject({from:e.addr,to:u,assetIndex:e.asset2ID,amount:I,suggestedParams:c});const p=n.default.makeAssetTransferTxnWithSuggestedParamsFromObject({from:u,to:e.addr,assetIndex:e.liquidityTokenID,amount:s,suggestedParams:c});let m=d.fee+l.fee+g.fee;const T=n.default.makePaymentTxnWithSuggestedParamsFromObject({from:u,to:e.addr,amount:m,note:a,suggestedParams:c});m+=p.fee+T.fee;const E=n.default.assignGroupID([T,d,l,g,p]);return[{txn:E[W.FEE_TXN],signers:[u]},{txn:E[W.VALIDATOR_APP_CALL_TXN],signers:[e.addr]},{txn:E[W.ASSET1_OUT_TXN],signers:[e.addr]},{txn:E[W.ASSET2_OUT_TXN],signers:[e.addr]},{txn:E[W.LIQUDITY_IN_TXN],signers:[u]}]},exports.generateMintTxns=async function({client:t,pool:e,asset1In:s,asset2In:o,liquidityOut:i,slippage:r,initiatorAddr:u}){const c=D("negative",r,i),d=await t.getTransactionParams().do(),A=n.default.makeApplicationNoOpTxnFromObject({from:e.addr,appIndex:e.validatorAppID,appArgs:[_("mint")],accounts:[u],foreignAssets:0==e.asset2ID?[e.asset1ID,e.liquidityTokenID]:[e.asset1ID,e.asset2ID,e.liquidityTokenID],suggestedParams:d}),l=n.default.makeAssetTransferTxnWithSuggestedParamsFromObject({from:u,to:e.addr,assetIndex:e.asset1ID,amount:s,suggestedParams:d});let I;I=0===e.asset2ID?n.default.makePaymentTxnWithSuggestedParamsFromObject({from:u,to:e.addr,amount:o,suggestedParams:d}):n.default.makeAssetTransferTxnWithSuggestedParamsFromObject({from:u,to:e.addr,assetIndex:e.asset2ID,amount:o,suggestedParams:d});const g=n.default.makeAssetTransferTxnWithSuggestedParamsFromObject({from:e.addr,to:u,assetIndex:e.liquidityTokenID,amount:c,suggestedParams:d}),p=n.default.makePaymentTxnWithSuggestedParamsFromObject({from:u,to:e.addr,amount:A.fee+g.fee,note:a,suggestedParams:d}),m=n.default.assignGroupID([p,A,l,I,g]);return[{txn:m[0],signers:[u]},{txn:m[1],signers:[e.addr]},{txn:m[2],signers:[u]},{txn:m[3],signers:[u]},{txn:m[4],signers:[e.addr]}]},exports.generateOptIntoAssetTxns=async function({client:t,assetID:e,initiatorAddr:s}){try{const a=await t.getTransactionParams().do();return[{txn:n.default.makeAssetTransferTxnWithSuggestedParamsFromObject({from:s,to:s,assetIndex:e,amount:0,suggestedParams:a}),signers:[s]}]}catch(t){throw new c(t,"We encountered something unexpected while opting into this asset. Try again later.")}},exports.generateOptIntoValidatorTxns=async function({client:t,validatorAppID:e,initiatorAddr:s}){const a=await t.getTransactionParams().do();return[{txn:n.default.makeApplicationOptInTxnFromObject({from:s,appIndex:e,suggestedParams:a}),signers:[s]}]},exports.generateOptOutOfValidatorTxns=async function({client:t,validatorAppID:e,initiatorAddr:s}){const a=await t.getTransactionParams().do();return[{txn:n.default.makeApplicationClearStateTxnFromObject({from:s,appIndex:e,suggestedParams:a}),signers:[s]}]},exports.generateRedeemTxns=async function({client:t,pool:e,assetID:s,assetOut:o,initiatorAddr:i}){const r=await t.getTransactionParams().do(),u=n.default.makeApplicationNoOpTxnFromObject({from:e.addr,appIndex:e.validatorAppID,appArgs:[_("redeem")],accounts:[i],foreignAssets:0==e.asset2ID?[e.asset1ID,e.liquidityTokenID]:[e.asset1ID,e.asset2ID,e.liquidityTokenID],suggestedParams:r});let c;c=0===s?n.default.makePaymentTxnWithSuggestedParamsFromObject({from:e.addr,to:i,amount:BigInt(o),suggestedParams:r}):n.default.makeAssetTransferTxnWithSuggestedParamsFromObject({from:e.addr,to:i,assetIndex:s,amount:BigInt(o),suggestedParams:r});const d=n.default.makePaymentTxnWithSuggestedParamsFromObject({from:i,to:e.addr,amount:u.fee+c.fee,note:a,suggestedParams:r}),A=n.default.assignGroupID([d,u,c]);return[{txn:A[0],signers:[i]},{txn:A[1],signers:[e.addr]},{txn:A[2],signers:[e.addr]}]},exports.generateSwapTransactions=async function({client:t,pool:e,swapType:s,assetIn:o,assetOut:i,slippage:r,initiatorAddr:u}){const c=await t.getTransactionParams().do(),d=[_("swap"),s===exports.SwapType.FixedInput?_("fi"):_("fo")],A=n.default.makeApplicationNoOpTxnFromObject({from:e.addr,appIndex:e.validatorAppID,appArgs:d,accounts:[u],foreignAssets:0==e.asset2ID?[e.asset1ID,e.liquidityTokenID]:[e.asset1ID,e.asset2ID,e.liquidityTokenID],suggestedParams:c}),l=s===exports.SwapType.FixedOutput?D("positive",r,o.amount):o.amount;let I;I=0===o.assetID?n.default.makePaymentTxnWithSuggestedParamsFromObject({from:u,to:e.addr,amount:l,suggestedParams:c}):n.default.makeAssetTransferTxnWithSuggestedParamsFromObject({from:u,to:e.addr,assetIndex:o.assetID,amount:l,suggestedParams:c});const g=s===exports.SwapType.FixedInput?D("negative",r,i.amount):i.amount;let p;p=0===i.assetID?n.default.makePaymentTxnWithSuggestedParamsFromObject({from:e.addr,to:u,amount:g,suggestedParams:c}):n.default.makeAssetTransferTxnWithSuggestedParamsFromObject({from:e.addr,to:u,assetIndex:i.assetID,amount:g,suggestedParams:c});const m=n.default.makePaymentTxnWithSuggestedParamsFromObject({from:u,to:e.addr,amount:A.fee+p.fee,note:a,suggestedParams:c}),T=n.default.assignGroupID([m,A,I,p]);return[{txn:T[0],signers:[u]},{txn:T[1],signers:[e.addr]},{txn:T[2],signers:[u]},{txn:T[3],signers:[e.addr]}]},exports.getAccountExcess=async function({client:t,accountAddr:s,validatorAppID:a}){const o=((await t.accountInformation(s).setIntDecoding("bigint").do())["apps-local-state"]||[]).find((t=>t.id==a));let i=[];if(o&&o["key-value"]){const t=d(o["key-value"]);for(let s of Object.entries(t)){const[t,a]=s,o=e.toByteArray(t);41===o.length&&101===o[32]&&i.push({poolAddress:n.default.encodeAddress(o.slice(0,32)),assetID:n.default.decodeUint64(o.slice(33,41),"safe"),amount:parseInt(a)})}}return i},exports.getAccountExcessWithinPool=R,exports.getAccountInformation=function(t,e){return new Promise((async(s,n)=>{try{const n=await t.accountInformation(e).do();s({...n,minimum_required_balance:M(n)})}catch(t){n(new Error(t.message||"Failed to fetch account information"))}}))},exports.getBootstrapProcessTxnCount=function(t){return 0===t?4:5},exports.getBurnLiquidityQuote=function({pool:t,reserves:e,liquidityIn:s}){const n=BigInt(s),a=e.issuedLiquidity&&n*e.asset1/e.issuedLiquidity,o=e.issuedLiquidity&&n*e.asset2/e.issuedLiquidity;return{round:e.round,liquidityID:t.liquidityTokenID,liquidityIn:n,asset1ID:t.asset1ID,asset1Out:a,asset2ID:t.asset2ID,asset2Out:o}},exports.getMintLiquidityQuote=function({pool:t,reserves:e,asset1In:s,asset2In:n}){if(0n===e.issuedLiquidity){const a=BigInt(Math.floor(Math.sqrt(Number(s)*Number(n))));if(a<=BigInt(1e3))throw new Error(`Initial liquidity mint too small. Liquidity minting amount must be greater than 1000, this quote is for ${a}.`);return{round:e.round,asset1ID:t.asset1ID,asset1In:BigInt(s),asset2ID:t.asset2ID,asset2In:BigInt(n),liquidityID:t.liquidityTokenID,liquidityOut:a-BigInt(1e3),share:1}}const a=BigInt(s)*e.issuedLiquidity/e.asset1,o=BigInt(n)*e.issuedLiquidity/e.asset2,i=a<o?a:o;return{round:e.round,asset1ID:t.asset1ID,asset1In:BigInt(s),asset2ID:t.asset2ID,asset2In:BigInt(n),liquidityID:t.liquidityTokenID,liquidityOut:i,share:v(e.issuedLiquidity+i,i)}},exports.getPoolAssets=J,exports.getPoolInfo=L,exports.getPoolPairRatio=function(t,e){const s=q(e);let n=null;return e&&!s&&e.asset1&&e.asset2&&"number"==typeof t.asset2&&"number"==typeof t.asset1&&(n=x(t.asset1,e.asset1)/x(t.asset2,e.asset2)),n},exports.getPoolReserves=async function(t,s){const a=await t.accountInformation(s.addr).setIntDecoding("bigint").do(),o=a["apps-local-state"]||[];let i=0n,r=0n,u=0n;for(const t of o){if(t.id!=s.validatorAppID)continue;const a=t["key-value"];if(!a)break;const o=d(a),c=e.fromByteArray(A([F,n.default.encodeUint64(s.asset1ID)])),l=e.fromByteArray(A([F,n.default.encodeUint64(s.asset2ID)])),I=e.fromByteArray(A([F,n.default.encodeUint64(s.liquidityTokenID)])),g=o[c],p=o[l],m=o[I];"bigint"==typeof g&&(i=g),"bigint"==typeof p&&(r=p),"bigint"==typeof m&&(u=m)}let c=0n,T=0n,E=0n;for(const t of a.assets){const e=t["asset-id"],{amount:n}=t;e==s.asset1ID?c=BigInt(n):e==s.asset2ID?T=BigInt(n):e==s.liquidityTokenID&&(E=BigInt(n))}if(0===s.asset2ID){const t=function(t){const e=t["apps-total-schema"];let s=0n,n=0n;e&&(e["num-byte-slice"]&&(s=e["num-byte-slice"]),e["num-uint"]&&(n=e["num-uint"]));const a=t["apps-local-state"]||[],o=t["created-apps"]||[],i=t.assets||[];return l+I*BigInt(i.length)+g*BigInt(o.length+a.length)+m*n+p*s}(a);T=BigInt(a.amount)-t}const D={round:Number(a.round),asset1:c-i,asset2:T-r,issuedLiquidity:X-E+u};if(D.asset1<0n||D.asset2<0n||D.issuedLiquidity<0n||D.issuedLiquidity>X)throw D.asset1=Number(D.asset1),D.asset2=Number(D.asset2),D.issuedLiquidity=Number(D.issuedLiquidity),new Error(`Invalid pool reserves: ${JSON.stringify(D)}`);return D},exports.getPoolShare=v,exports.getStakingAppID=function(t){return"testnet"===t?51948952:649588853},exports.getSwapQuote=function(t,e,s,n,a){let o;if(e.status!==exports.PoolStatus.READY)throw new c({pool:e,asset:n},"Trying to swap on a non-existent pool");return o="fixed-input"===t?function({pool:t,reserves:e,assetIn:s,decimals:n}){const a=BigInt(s.amount);let o,i,r;s.assetID===t.asset1ID?(o=t.asset2ID,i=e.asset1,r=e.asset2):(o=t.asset1ID,i=e.asset2,r=e.asset1);const u=a*V/H,c=r-i*r/(i+(a-u));if(c>r)throw new Error("Output amount exceeds available liquidity.");const d=x(n.assetOut,Number(c))/x(n.assetIn,Number(a)),A=1/d,l=x(n.assetIn,Number(i))/x(n.assetOut,Number(r)),I=f({decimalPlaces:5},Math.abs(A/l-1));return{round:e.round,assetInID:s.assetID,assetInAmount:a,assetOutID:o,assetOutAmount:c,swapFee:Number(u),rate:d,priceImpact:I}}({pool:e,reserves:s,assetIn:n,decimals:a}):function({pool:t,reserves:e,assetOut:s,decimals:n}){const a=BigInt(s.amount);let o,i,r;if(s.assetID===t.asset1ID?(o=t.asset2ID,i=e.asset2,r=e.asset1):(o=t.asset1ID,i=e.asset1,r=e.asset2),a>r)throw new Error("Output amount exceeds available liquidity.");const u=i*r/(r-a)-i,c=u*H/(H-V),d=c-u,A=x(n.assetOut,Number(a))/x(n.assetIn,Number(c)),l=1/A,I=x(n.assetIn,Number(i))/x(n.assetOut,Number(r)),g=f({decimalPlaces:5},Math.abs(l/I-1));return{round:e.round,assetInID:o,assetInAmount:c,assetOutID:s.assetID,assetOutAmount:a,swapFee:Number(d),rate:A,priceImpact:g}}({pool:e,reserves:s,assetOut:n,decimals:a}),o},exports.getTxnGroupID=S,exports.getValidatorAppID=function(t){const e=k[t];if(!e)throw new Error(`No Validator App exists for network ${t}`);return e},exports.hasSufficientMinimumBalance=function(t){return t.amount>=t.minimum_required_balance},exports.isAccountOptedIntoApp=function({appID:t,accountAppsLocalState:e}){return e.some((e=>e.id===t))},exports.isPoolEmpty=q,exports.isPoolNotCreated=function(t){return t?.status===exports.PoolStatus.NOT_CREATED},exports.isPoolReady=function(t){return t?.status===exports.PoolStatus.READY},exports.issueSwap=async function({client:t,pool:e,swapType:s,txGroup:n,signedTxns:a,initiatorAddr:o}){if(e.status!==exports.PoolStatus.READY)throw new c({pool:e,swapType:s,txGroup:n},"Trying to swap on a non-existent pool");try{const i={assetID:n[K.ASSET_IN_TXN_INDEX].txn.assetIndex||0,amount:n[K.ASSET_IN_TXN_INDEX].txn.amount},r={assetID:n[K.ASSET_OUT_TXN_INDEX].txn.assetIndex||0,amount:n[K.ASSET_OUT_TXN_INDEX].txn.amount};let u;return u=s===exports.SwapType.FixedInput?await async function({client:t,pool:e,signedTxns:s,assetIn:n,assetOut:a,initiatorAddr:o}){const i=await R({client:t,pool:e,accountAddr:o});let[{confirmedRound:r,txnID:u}]=await N(t,[s]);const c=await R({client:t,pool:e,accountAddr:o});let d,A;a.assetID===e.asset1ID?(d=i.excessAsset1,A=c.excessAsset1):(d=i.excessAsset2,A=c.excessAsset2);let l=A-d;return l<0n&&(l=0n),{round:r,assetInID:n.assetID,assetInAmount:BigInt(n.amount),assetOutID:a.assetID,assetOutAmount:BigInt(a.amount)+l,excessAmount:{assetID:a.assetID,excessAmountForSwap:l,totalExcessAmount:A},txnID:u}}({client:t,pool:e,signedTxns:a,assetIn:i,assetOut:r,initiatorAddr:o}):await async function({client:t,pool:e,signedTxns:s,assetIn:n,assetOut:a,initiatorAddr:o}){const i=await R({client:t,pool:e,accountAddr:o});let[{confirmedRound:r,txnID:u}]=await N(t,[s]);const c=await R({client:t,pool:e,accountAddr:o});let d,A;n.assetID===e.asset1ID?(d=i.excessAsset1,A=c.excessAsset1):(d=i.excessAsset2,A=c.excessAsset2);let l=A-d;return l<0n&&(l=0n),{round:r,assetInID:n.assetID,assetInAmount:BigInt(n.amount)-l,assetOutID:a.assetID,assetOutAmount:BigInt(a.amount),excessAmount:{assetID:n.assetID,excessAmountForSwap:l,totalExcessAmount:A},txnID:u}}({client:t,pool:e,signedTxns:a,assetIn:i,assetOut:r,initiatorAddr:o}),{...u,groupID:S(n),fees:y(n)}}catch(t){const e=new c(t,"We encountered something unexpected while swapping. Try again later.");throw"SlippageTolerance"===e.type&&e.setMessage("The swap failed due to too much slippage in the price. Please adjust the slippage tolerance and try again."),e}},exports.mintLiquidity=async function({client:t,pool:e,txGroup:s,signedTxns:n,initiatorAddr:a}){try{const o=BigInt(s[G.LIQUDITY_OUT_TXN].txn.amount),i=await R({client:t,pool:e,accountAddr:a}),[{confirmedRound:r,txnID:u}]=await N(t,[n]),c=y(s),d=S(s),A=await R({client:t,pool:e,accountAddr:a});let l=A.excessLiquidityTokens-i.excessLiquidityTokens;return l<0n&&(l=0n),{round:r,fees:c,liquidityID:e.liquidityTokenID,liquidityOut:o+l,excessAmount:{excessAmountForMinting:l,totalExcessAmount:A.excessLiquidityTokens},txnID:u,groupID:d}}catch(t){const e=new c(t,"We encountered something unexpected while minting liquidity. Try again later.");throw"SlippageTolerance"===e.type&&e.setMessage("Minting failed due to too much slippage in the price. Please adjust the slippage tolerance and try again."),e}},exports.prepareCommitTransactions=async function({client:e,stakingAppID:s,initiatorAddr:n,liquidityAssetID:a,program:o,amount:i}){const r=await e.getTransactionParams().do(),u=t.encodeUint64(i),c=t.encodeUint64(o.id);return[{txn:t.makeApplicationNoOpTxnFromObject({appIndex:s,from:n,suggestedParams:r,foreignAssets:[a],accounts:[o.accountAddress],appArgs:[_("commit"),u],note:A([_("tinymanStaking/v1:b"),c,t.encodeUint64(a),u])}),signers:[n]}]},exports.redeemAllExcessAsset=async function({client:e,data:s,initiatorSigner:a}){try{const o=s.map((({txGroup:e,pool:s})=>({txns:e,txnFees:y(e),groupID:S(e),lsig:new t.LogicSigAccount(s.program)}))),i=await a(o.map((t=>t.txns)));return Promise.all(o.map(((t,s)=>new Promise((async(a,o)=>{try{const o=t.txns.map(((e,a)=>{if(0===a)return i[s];const{blob:o}=n.default.signLogicSigTransactionObject(e.txn,t.lsig);return o})),[{txnID:r,confirmedRound:u}]=await N(e,[o]);a({fees:t.txnFees,groupID:t.groupID,txnID:r,confirmedRound:u})}catch(t){o(t)}})))))}catch(t){throw new c(t,"We encountered something unexpected while redeeming. Try again later.")}},exports.redeemExcessAsset=async function({client:e,pool:s,txGroup:a,initiatorSigner:o}){try{const i=await async function({txGroup:e,pool:s,initiatorSigner:a}){const[o]=await a([e]),i=new t.LogicSigAccount(s.program);return e.map(((t,e)=>{if(0===e)return o;const{blob:s}=n.default.signLogicSigTransactionObject(t.txn,i);return s}))}({txGroup:a,pool:s,initiatorSigner:o}),[{txnID:r,confirmedRound:u}]=await N(e,[i]);return{fees:y(a),confirmedRound:u,txnID:r,groupID:S(a)}}catch(t){throw new c(t,"We encountered something unexpected while redeeming. Try again later.")}},exports.sendAndWaitRawTransaction=N,exports.signBootstrapTransactions=async function({txGroup:e,initiatorSigner:s,validatorAppID:a,asset1ID:o,asset2ID:i}){const[r]=await s([e]),u=o>i?{asset1ID:o,asset2ID:i}:{asset1ID:i,asset2ID:o},c=Q.getPoolLogicSig({asset1ID:u.asset1ID,asset2ID:u.asset2ID,validatorAppID:a}),d=new t.LogicSigAccount(c.program),A=[];return{signedTxns:e.map(((t,e)=>{if(e===z.FUNDING_TXN)return A.push(t.txn.txID().toString()),r;const{txID:s,blob:a}=n.default.signLogicSigTransactionObject(t.txn,d);return A.push(s),a})),txnIDs:A}},exports.signBurnTxns=async function({pool:e,txGroup:s,initiatorSigner:a}){const[o,i]=await a([s]),r=new t.LogicSigAccount(e.program);return s.map(((t,e)=>{if(e===W.FEE_TXN)return o;if(e===W.LIQUDITY_IN_TXN)return i;const{blob:s}=n.default.signLogicSigTransactionObject(t.txn,r);return s}))},exports.signMintTxns=async function({pool:e,txGroup:s,initiatorSigner:a}){const o=new t.LogicSigAccount(e.program),[i,r,u]=await a([s]);return s.map(((t,e)=>{if(e===G.FEE_TXN)return i;if(e===G.ASSET1_IN_TXN)return r;if(e===G.ASSET2_IN_TXN)return u;const{blob:s}=n.default.signLogicSigTransactionObject(t.txn,o);return s}))},exports.signSwapTransactions=async function({pool:e,txGroup:s,initiatorSigner:a}){const o=new t.LogicSigAccount(e.program),[i,r]=await a([s]);return s.map(((t,e)=>{if(e===K.FEE_TXN_INDEX)return i;if(e===K.ASSET_IN_TXN_INDEX)return r;const{blob:s}=n.default.signLogicSigTransactionObject(t.txn,o);return s}))},exports.sumUpTxnFees=y,exports.validatorAppSchema=O;
