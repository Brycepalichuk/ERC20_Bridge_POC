const logger = Moralis.Cloud.getLogger();

const web3Main = Moralis.web3ByChain("0x4"); // Rinkeby Testnet
const web3Side = Moralis.web3ByChain("0x13881"); // Mumbai Testnet

const MainBridge_address = "0x115259AE4F24B79C51C84035e9eb3b553d9D2E8C"; // Rinkeby
const SideBridge_address = "0x81071Ea1de5Ea57F3CC37Cd03845dfD77500bBf1”"; // Mumbai
const mainToken_address = "0xc6Ca96a4bfB6814c9D07000b14b323B0Cc8D3374"; // Rinkeby
const childToken_address = "0xC59ce03F8dD191cA34ff04778014cb3808F5C89A"; // Mumbai
const gateway_address = "0xdf18dA79b735bbDDB843ee8930DB935132Aae2AC";
const gatewayKey = "d45243830a63c045698655bc4977a27e2acb43455014908e0569ac98222ef9fe";
const MainBridge_abi = '[ { "inputs": [ { "internalType": "address", "name": "_mainToken", "type": "address" }, { "internalType": "address", "name": "_gateway", "type": "address" } ], "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "requester", "type": "address" }, { "indexed": true, "internalType": "bytes32", "name": "mainDepositHash", "type": "bytes32" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "timestamp", "type": "uint256" } ], "name": "TokensLocked", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "requester", "type": "address" }, { "indexed": true, "internalType": "bytes32", "name": "sideDepositHash", "type": "bytes32" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "timestamp", "type": "uint256" } ], "name": "TokensUnlocked", "type": "event" }, { "inputs": [ { "internalType": "address", "name": "_requester", "type": "address" }, { "internalType": "uint256", "name": "_bridgedAmount", "type": "uint256" }, { "internalType": "bytes32", "name": "_mainDepositHash", "type": "bytes32" } ], "name": "lockTokens", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "_requester", "type": "address" }, { "internalType": "uint256", "name": "_bridgedAmount", "type": "uint256" }, { "internalType": "bytes32", "name": "_sideDepositHash", "type": "bytes32" } ], "name": "unlockTokens", "outputs": [], "stateMutability": "nonpayable", "type": "function" } ]';
const SideBridge_abi = '[ { "inputs": [ { "internalType": "address", "name": "_gateway", "type": "address" } ], "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "uint256", "name": "timestamp", "type": "uint256" } ], "name": "BridgeInitialized", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "requester", "type": "address" }, { "indexed": true, "internalType": "bytes32", "name": "mainDepositHash", "type": "bytes32" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "timestamp", "type": "uint256" } ], "name": "TokensBridged", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "requester", "type": "address" }, { "indexed": true, "internalType": "bytes32", "name": "sideDepositHash", "type": "bytes32" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "timestamp", "type": "uint256" } ], "name": "TokensReturned", "type": "event" }, { "inputs": [ { "internalType": "address", "name": "_requester", "type": "address" }, { "internalType": "uint256", "name": "_bridgedAmount", "type": "uint256" }, { "internalType": "bytes32", "name": "_mainDepositHash", "type": "bytes32" } ], "name": "bridgeTokens", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "_childTokenAddress", "type": "address" } ], "name": "initializeBridge", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "_requester", "type": "address" }, { "internalType": "uint256", "name": "_bridgedAmount", "type": "uint256" }, { "internalType": "bytes32", "name": "_sideDepositHash", "type": "bytes32" } ], "name": "returnTokens", "outputs": [], "stateMutability": "nonpayable", "type": "function" } ]';
const MainBridge = new web3Main.eth.Contract(JSON.parse(MainBridge_abi),MainBridge_address);
const SideBridge = new web3Side.eth.Contract(JSON.parse(SideBridge_abi),SideBridge_address);

Moralis.Cloud.afterSave("EthTokenTransfers", (request) => {
    const data = JSON.parse(JSON.stringify(request.object, ["token_address", "to_address", "from_address","transaction_hash","value", "confirmed"]));
    logger.info(data);
    if (data["token_address"] == mainToken_address.toLocaleLowerCase() && data["to_address"] == MainBridge_address.toLocaleLowerCase() && !data["confirmed"]) {
        const txlock = processBridgeRequestLock(data);
        const txbridge = processBridgeRequestBridge(data);
    }
    else{
        logger.info("transaction not related to bridge");
    }
    async function processBridgeRequestLock(data) {
        logger.info("bridging starting locking tokens");
        const functionCall = MainBridge.methods.lockTokens(data["from_address"],data["value"],data["transaction_hash"]).encodeABI();
        const gatewayNonce = web3Main.eth.getTransactionCount(gateway_address);
        const transactionBody = {
            to: MainBridge_address,
            nonce:gatewayNonce,
            data:functionCall,
            gas:400000,
            gasPrice:web3Main.utils.toWei("2", "gwei")
        }
        signedTransaction = await web3Main.eth.accounts.signTransaction(transactionBody,gatewayKey);
        logger.info(signedTransaction.transactionHash);
        fulfillTx = await web3Main.eth.sendSignedTransaction(signedTransaction.rawTransaction);
        logger.info("fulfillTx: " + JSON.stringify(fulfillTx));
    }
    async function processBridgeRequestBridge(data) {
        logger.info("bridging tokens");
        const functionCall = SideBridge.methods.bridgeTokens(data["from_address"],data["value"],data["transaction_hash"]).encodeABI();
        const gatewayNonce = web3Side.eth.getTransactionCount(gateway_address);
        const transactionBody = {
            to: SideBridge_address,
              nonce:gatewayNonce,
              data:functionCall,
              gas:400000,
              gasPrice:web3Side.utils.toWei("2", "gwei")
        }
        signedTransaction = await web3Side.eth.accounts.signTransaction(transactionBody,gatewayKey);
        logger.info(signedTransaction.transactionHash);
        fulfillTx = await web3Side.eth.sendSignedTransaction(signedTransaction.rawTransaction);
        logger.info("fulfillTx: " + JSON.stringify(fulfillTx))
        return fulfillTx;
    }
});


Moralis.Cloud.afterSave("PolygonTokenTransfers", (request) => {
    const data = JSON.parse(JSON.stringify(request.object, ["token_address", "to_address", "from_address","transaction_hash","value", "confirmed"]));
    logger.info(data);
    if (data["token_address"] == childToken_address.toLocaleLowerCase() && data["to_address"] == SideBridge_address.toLocaleLowerCase() && !data["confirmed"]) {
        const txlock = processReturnBurn(data);
        const txbridge = processReturnUnlock(data);
    }
    else{
        logger.info("transaction not related to bridge");
    }
    async function processReturnBurn(data) {
        logger.info("returning tokens burning");
        const functionCall = SideBridge.methods.returnTokens(data["from_address"],data["value"],data["transaction_hash"]).encodeABI();
        const gatewayNonce = web3Side.eth.getTransactionCount(gateway_address);
        const transactionBody = {
            to: SideBridge_address,
              nonce:gatewayNonce,
              data:functionCall,
              gas:400000,
              gasPrice:web3Side.utils.toWei("2", "gwei")
        }
        signedTransaction = await web3Side.eth.accounts.signTransaction(transactionBody,gatewayKey);
        logger.info(signedTransaction.transactionHash);
        fulfillTx = await web3Side.eth.sendSignedTransaction(signedTransaction.rawTransaction);
        logger.info("fulfillTx: " + JSON.stringify(fulfillTx))
        return fulfillTx;
    }
    async function processReturnUnlock(data) {
        logger.info("returning starting unlocking tokens");
        const functionCall = MainBridge.methods.unlockTokens(data["from_address"],data["value"],data["transaction_hash"]).encodeABI();
        const gatewayNonce = web3Main.eth.getTransactionCount(gateway_address);
        const transactionBody = {
            to: MainBridge_address,
              nonce:gatewayNonce,
              data:functionCall,
              gas:400000,
              gasPrice:web3Main.utils.toWei("2", "gwei")
        }
        signedTransaction = await web3Main.eth.accounts.signTransaction(transactionBody,gatewayKey);
        logger.info(signedTransaction.transactionHash);
        fulfillTx = await web3Main.eth.sendSignedTransaction(signedTransaction.rawTransaction);
        logger.info("fulfillTx: " + JSON.stringify(fulfillTx));
    }
});
