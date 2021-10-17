import {Block, Log, Transaction} from './models';

export function blockHandle(data: Block) {
  return {
    ...data,
    number: parseInt(data.number),
    timestamp: new Date(data.timestamp).getTime(),
    difficulty: parseInt(data.difficulty),
    transactions: [],
    baseFeePerGas: parseInt(data.baseFeePerGas),
  }
}

export function transactionHandle(data: Transaction) {
  return {

  }
}

export function logHandle(data: Log) {
  const topics = [];
  if (data.topic0) topics.push(data.topic0);
  if (data.topic1) topics.push(data.topic1);
  if (data.topic2) topics.push(data.topic2);
  if (data.topic3) topics.push(data.topic3);

  return {
    ...data,
    blockNumber: parseInt(data.blockNumber),
    transactionIndex: parseInt(data.transactionIndex),
    removed: false,
    topics: topics,
    args: data.dataDecoded,
    logIndex: parseInt(data.logIndex),
    event: data.logName,
    eventSignature: data.topic0Decoded,
  }
}
