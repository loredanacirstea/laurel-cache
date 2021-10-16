import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    postgresql: {
      table: 'transactions',
    },
  },
})
export class Transaction extends Entity {
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
    type: 'number',
    required: true,
  })
  nonce: number;

  @property({
    type: 'number',
    required: true,
  })
  transaction_index: number;

  @property({
    type: 'string',
    required: true,
  })
  from_address: string;

  @property({
    type: 'string',
    required: true,
  })
  to_address: string;

  @property({
    type: 'string',
    default: 0x0000000000000000000000000000000000000000000000000000000000000000,
  })
  value?: string;

  @property({
    type: 'number',
    required: true,
  })
  gas: number;

  @property({
    type: 'number',
    required: true,
  })
  gas_price: number;

  @property({
    type: 'string',
  })
  input?: string;

  @property({
    type: 'number',
  })
  receipt_cumulative_gas_used?: number;

  @property({
    type: 'number',
  })
  receipt_gas_used?: number;

  @property({
    type: 'string',
  })
  receipt_contract_address?: string;

  @property({
    type: 'string',
  })
  receipt_root?: string;

  @property({
    type: 'number',
  })
  receipt_status?: number;

  @property({
    type: 'date',
  })
  block_timestamp?: string;

  @property({
    type: 'number',
    required: true,
  })
  block_number: number;

  @property({
    type: 'string',
    required: true,
  })
  block_hash: string;

  @property({
    type: 'number',
  })
  max_fee_per_gas?: number;

  @property({
    type: 'number',
  })
  max_priority_fee_per_gas?: number;

  @property({
    type: 'number',
  })
  transaction_type?: number;

  @property({
    type: 'number',
  })
  receipt_effective_gas_price?: number;


  constructor(data?: Partial<Transaction>) {
    super(data);
  }
}

export interface TransactionRelations {
  // describe navigational properties here
}

export type TransactionWithRelations = Transaction & TransactionRelations;
