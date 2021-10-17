import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Transaction} from './transaction.model';

@model({
  settings: {
    postgresql: {
      table: 'logs',
    },
  },
})
export class Log extends Entity {
  @property({
    type: 'string',
    id: true,
    required: true,
  })
  id: string;

  // TODO number
  @property({
    name: 'log_index',
    type: 'string',
    required: true,
  })
  logIndex: string;
  // TODO number
  @property({
    name: 'transaction_index',
    type: 'string',
    required: true,
  })
  transactionIndex: string;

  @property({
    type: 'string',
    required: true,
  })
  address: string;

  @property({
    type: 'string',
    default: '0x',
  })
  data?: string;

  @property({
    type: 'string',
  })
  topic0?: string;

  @property({
    type: 'string',
  })
  topic1?: string;

  @property({
    type: 'string',
  })
  topic2?: string;

  @property({
    type: 'string',
  })
  topic3?: string;

  @property({
    name: 'block_timestamp',
    type: 'date',
    required: true,
  })
  blockTimestamp: string;

  // TODO number
  @property({
    name: 'block_number',
    type: 'string',
    required: true,
  })
  blockNumber: string;

  @property({
    name: 'block_hash',
    type: 'string',
    required: true,
  })
  blockHash: string;

  @belongsTo(() => Transaction, {name: 'transaction'})
  transactionHash: string;
  @property({
    name: 'log_name',
    type: 'string',
    required: true,
  })
  logName: string;

  @property({
    name: 'topic0_decoded',
    type: 'string',
    required: true,
  })
  topic0Decoded: string;

  @property({
    name: 'data_decoded',
    type: 'string',
    required: true,
  })
  dataDecoded: string;


  constructor(data?: Partial<Log>) {
    super(data);
  }
}

export interface LogRelations {
  // describe navigational properties here
}

export type LogWithRelations = Log & LogRelations;
