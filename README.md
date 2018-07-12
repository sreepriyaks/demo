# About this server

This is a sample solution for a quick tendermint demo. This essentially enables you to send transactions to a tendermint network and see the transaction getting approved and committed by the validators and propogated over all the nodes seamlessly. First deploy a Tendermint test-net by following the below commands and use this server to play around sending transactions, querying data from tendermint, checking list of validators, chain info, blockhain status, block info etc.

This solution also contains a script that generates 100 transactions. This will show the speed of tendermint network in commiting transactions.

Currently only 2 nodes are used, this codebase will be updated to use 4 tendermint nodes and steps to test the BFT capability of tendermint will also be documented here soon.

# Deploy Tendermint test-net with 2 nodes
1.	Spin up 2 Ubuntu instances
2.	Install Tendermint and the application of interest on all nodes
3.	Generate a private key and a node key for each validator using
`tendermint init`
4.	Compile a list of public keys for each validator into a `genesis.json` file and replace the existing file with it
5.	Get the Tendermint node id of each node by running the below command
`tendermint show_node_id`
6.	Run
`abci-cli kvstore` on both nodes
*Note: kvstore is one of the sample abci applications that ships by default with Tendermint installation package*
7.	Run
`tendermint node --p2p.persistent_peers=< peer addresses >`
on each node, where `< peer addresses >` is a comma separated list of the `TENDERMINT_NODE_ID@IP:PORT` combination for each node. The default port for Tendermint is `26656`.
Thus the command to run on first node:
`tendermint node --p2p.persistent_peers=TENDERMINT_NODE_ID@10.0.2.5:26656 --consensus.create_empty_blocks=false`
& the command to run on second node:
`tendermint node --p2p.persistent_peers=TENDERMINT_NODE_ID@10.0.2.4:26656 --consensus.create_empty_blocks=false`
NB: `10.0.2.5` and `10.0.2.4` are my node’s internal IPs

After a few seconds, all the nodes should connect to each other and start making blocks


# Steps to Install Tendermint on an Ubuntu Instance

Run the below commands on sudo user

STEP1:
1.	sudo apt-get update -y
2.	sudo apt-get upgrade -y
3.	sudo apt-get install -y make

STEP2: Get and unpack golang
1. curl -O https://storage.googleapis.com/golang/go1.10.linux-amd64.tar.gz
2. tar -xvf go1.10.linux-amd64.tar.gz

STEP3: Move go binary and add to path
1. mv go /usr/local
2. echo "export PATH=\$PATH:/usr/local/go/bin" >> ~/.profile

STEP4: create the goApps directory, set GOPATH, and put it on PATH
1. mkdir goApps
2. echo "export GOPATH=/root/goApps" >> ~/.profile
3. echo "export PATH=\$PATH:\$GOPATH/bin" >> ~/.profile

STEP5: Reset the terminal
1. source ~/.profile

STEP6: Get the code and move into repo
1. go get $REPO
2. cd $GOPATH/src/$REPO

STEP7: Build & install
1. git checkout $BRANCH
2. make get_tools
3. make get_vendor_deps
4. make install

STEP8: Reset terminal
1. source ~/.profile

Note: the binary is located in $GOPATH/bin

  
