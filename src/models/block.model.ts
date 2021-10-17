import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    postgresql: {
      table: 'blocks',
    },
  },
})
export class Block extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
    required: true,
  })
  id: string;

  @property({
    type: 'string',
    required: true,
  })
  hash: string;

  @property({
    name: 'parent_hash',
    type: 'string',
    required: true,
  })
  parentHash: string;

  @property({
    type: 'string',
    required: true,
  })
  number: string;

  @property({
    type: 'date',
    required: true,
  })
  timestamp: string;

  @property({
    type: 'string',
    required: true,
  })
  nonce: string;

  @property({
    name: 'sha3_uncles',
    type: 'string',
  })
  sha3Uncles?: string;

  @property({
    name: 'logs_bloom',
    type: 'string',
  })
  logsBloom?: string;

  @property({
    name: 'transactions_root',
    type: 'string',
    required: true,
  })
  transactionsRoot: string;

  @property({
    name: 'state_root',
    type: 'string',
    required: true,
  })
  stateRoot: string;

  @property({
    name: 'receipts_root',
    type: 'string',
    required: true,
  })
  receiptsRoot: string;

  @property({
    type: 'string',
    required: true,
  })
  miner: string;

  @property({
    type: 'string',
    required: true,
  })
  difficulty: string;

  @property({
    name: 'total_difficulty',
    type: 'number',
    required: true,
  })
  totalDifficulty: number;

  @property({
    type: 'number',
  })
  size?: number;

  @property({
    name: 'extra_data',
    type: 'string',
  })
  extraData?: string;

  @property({
    name: 'gas_limit',
    type: 'string',
    required: true,
  })
  gasLimit: string;

  @property({
    name: 'gas_used',
    type: 'string',
    required: true,
  })
  gasUsed: string;

  @property({
    name: 'transaction_count',
    type: 'number',
    required: true,
  })
  transactionCount: number;

  @property({
    name: 'base_fee_per_gas',
    type: 'string',
    required: true,
  })
  baseFeePerGas: string;

  constructor(data?: Partial<Block>) {
    super(data);
  }
}

export interface BlockRelations {
  // describe navigational properties here
}

export type BlockWithRelations = Block & BlockRelations;
