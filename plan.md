# Plan

## Motivation

Because the events of the original The Laurel v1 contract were not indexed on all necessary dimensions, the dapps that use it take a long time and the wait grows with the number of transactions.

See https://youtu.be/BvmXA3bROos One of the abstracted blockchains is the contract blockchain. In our special case the contract links the state of the variables to a meta-variable called laurel-supply.
Using that variable we can implement a blockchain for the contract and have it cached off-chain.

## Resources/Targets

1. a SQL database well-indexed on all necessay dimensions
2. a server compatible with Web3 providers
3. a data backup from Rinkeby testnet, hopefully in the ETL standard

## Steps

- DB
1. find a free SQL DB provider
2. modify https://github.com/blockchain-etl/ethereum-etl in such a way that it retains only data pertinent to 1 contract: The Laurel
3. set the data on it in conformance with https://github.com/blockchain-etl/ethereum-etl

- Node.js
1. create a server that serves https://github.com/blockchain-etl/ethereum-etl data
2. make sure it is compatible with web3 standards
3. create a chaching on it for transactions of interest (if speed is greatly improved by caching)
4. keep data in sync with Rinkeby

- marks
1. modify the dapps to use this cache

## Quick alternative

- DB & Node: one single table with mapping hash(input) -> output
- marks made in a way as to memoize onto the DB
