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
    type: 'string',
    required: true,
  })
  parent_hash: string;

  @property({
    type: 'number',
    required: true,
  })
  number: number;

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
    type: 'string',
  })
  sha3_uncles?: string;

  @property({
    type: 'string',
  })
  logs_bloom?: string;

  @property({
    type: 'string',
    required: true,
  })
  transactions_root: string;

  @property({
    type: 'string',
    required: true,
  })
  state_root: string;

  @property({
    type: 'string',
    required: true,
  })
  receipts_root: string;

  @property({
    type: 'string',
    required: true,
  })
  miner: string;

  @property({
    type: 'number',
    required: true,
  })
  difficulty: number;

  @property({
    type: 'number',
    required: true,
  })
  total_difficulty: number;

  @property({
    type: 'number',
  })
  size?: number;

  @property({
    type: 'string',
  })
  extra_data?: string;

  @property({
    type: 'number',
    required: true,
  })
  gas_limit: number;

  @property({
    type: 'number',
    required: true,
  })
  gas_used: number;

  @property({
    type: 'number',
    required: true,
  })
  transactions_count: number;

  @property({
    type: 'number',
  })
  base_fee_per_gas?: number;


  constructor(data?: Partial<Block>) {
    super(data);
  }
}

export interface BlockRelations {
  // describe navigational properties here
}

export type BlockWithRelations = Block & BlockRelations;
