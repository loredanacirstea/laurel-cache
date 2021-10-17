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
    name: 'transaction_index',
    type: 'number',
    required: true,
  })
  transactionIndex: number;

  @property({
    name: 'from_address',
    type: 'string',
    required: true,
  })
  fromAddress: string;

  @property({
    name: 'to_address',
    type: 'string',
    required: true,
  })
  toAddress: string;

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
    name: 'gas_price',
    type: 'number',
    required: true,
  })
  gasPrice: number;

  @property({
    type: 'string',
  })
  input?: string;

  @property({
    name: 'receipt_cumulative_gas_used',
    type: 'number',
  })
  receiptCumulativeGasUsed?: number;

  @property({
    name: 'receipt_gas_used',
    type: 'number',
  })
  receiptGasUsed?: number;

  @property({
    name: 'receipt_contract_address',
    type: 'string',
  })
  receiptContractAddress?: string;

  @property({
    name: 'receipt_root',
    type: 'string',
  })
  receiptRoot?: string;

  @property({
    name: 'receipt_status',
    type: 'number',
  })
  receiptStatus?: number;

  @property({
    name: 'block_timestamp',
    type: 'date',
  })
  blockTimestamp?: string;

  @property({
    name: 'block_number',
    type: 'number',
    required: true,
  })
  blockNumber: number;

  @property({
    name: 'block_hash',
    type: 'string',
    required: true,
  })
  blockHash: string;

  @property({
    name: 'max_fee_per_gas',
    type: 'number',
  })
  maxFeePerGas?: number;

  @property({
    name: 'max_priority_fee_per_gas',
    type: 'number',
  })
  maxPriorityFeePerGas?: number;

  @property({
    name: 'transaction_type',
    type: 'number',
  })
  transactionType?: number;

  @property({
    name: 'receipt_effective_gas_price',
    type: 'number',
  })
  receiptEffectiveGasPrice?: number;


  constructor(data?: Partial<Transaction>) {
    super(data);
  }
}

export interface TransactionRelations {
  // describe navigational properties here
}

export type TransactionWithRelations = Transaction & TransactionRelations;
