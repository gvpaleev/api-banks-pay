// import library
const monerojs = require("monero-javascript");
(async()=>{
// connect to daemon
let daemon = await monerojs.connectToDaemonRpc("http://192.168.0.2:18081");
let height = await daemon.getHeight();            // 1523651
let txsInPool = await daemon.getTxPool();         // get transactions in the pool

// open wallet on monero-wallet-rpc
let walletRpc = await monerojs.connectToWalletRpc("http://192.168.0.2:18084", "monero", "rpcPassword");
// await walletRpc.openWallet("test", "1");
// let primaryAddress = await walletRpc.getPrimaryAddress(); // 555zgduFhmKd2o8rPUz...
// let balance = await walletRpc.getBalance();               // 533648366742
// let txs = await walletRpc.getTxs();                       // get transactions containing transfers to/from the wallet

// create wallet from seed phrase using WebAssembly bindings to monero-project
let walletFull = await monerojs.createWalletFull({
  path: ".",
  password: "supersecretpassword123",
  networkType: "MAINNET",
  serverUri: "http://127.0.0.1:18081",
  serverUsername: "superuser",
  serverPassword: "abctesting123",
  seed: "hefty value scenic...",
  restoreHeight: 573936,
});

// synchronize with progress notifications
await walletFull.sync(new class extends monerojs.MoneroWalletListener {
  onSyncProgress(height, startHeight, endHeight, percentDone, message) {
    // feed a progress bar?
  }
});

// synchronize in the background every 5 seconds
await walletFull.startSyncing(5000);

// receive notifications when funds are received, confirmed, and unlocked
let fundsReceived = false;
await walletFull.addListener(new class extends monerojs.MoneroWalletListener {
  onOutputReceived(output) {
    let amount = output.getAmount();
    let txHash = output.getTx().getHash();
    let isConfirmed = output.getTx().isConfirmed();
    let isLocked = output.getTx().isLocked();
    fundsReceived = true;
  }
});

// send funds from RPC wallet to WebAssembly wallet
let createdTx = await walletRpc.createTx({
  accountIndex: 0,
  address: await walletFull.getAddress(1, 0),
  amount: "250000000000", // send 0.25 XMR (denominated in atomic units)
  relay: false // create transaction and relay to the network if true
});
let fee = createdTx.getFee(); // "Are you sure you want to send... ?"
await walletRpc.relayTx(createdTx); // relay the transaction

// recipient receives unconfirmed funds within 5 seconds
await new Promise(function(resolve) { setTimeout(resolve, 5000); });
assert(fundsReceived);

// save and close WebAssembly wallet
await walletFull.close(true);


})()