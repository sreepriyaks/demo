module.exports = {
    tx_baseUrl: "http://localhost:26657/broadcast_tx_commit?tx=",
    qry_baseUrl: "http://localhost:26657/abci_query?data=",
    blkchnStatusUrl: "http://localhost:26657/status",
    unconfirmedTxs: "http://localhost:26657/unconfirmed_txs",
    dump_consensus_state: "http://localhost:26657/dump_consensus_state",
    genesis: "http://localhost:26657/genesis",
    net_info: "http://localhost:26657/net_info",
    validators: "http://localhost:26657/validators",
    blockInfo: "http://localhost:26657/block?height="
};