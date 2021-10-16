import {Entity, model, property} from '@loopback/repository';

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

  @property({
    type: 'number',
    required: true,
  })
  log_index: number;

  @property({
    type: 'string',
    required: true,
  })
  transaction_hash: string;

  @property({
    type: 'number',
  })
  transaction_index?: number;

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
    type: 'date',
    required: true,
  })
  block_timestamp: string;

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


  constructor(data?: Partial<Log>) {
    super(data);
  }
}

export interface LogRelations {
  // describe navigational properties here
}

export type LogWithRelations = Log & LogRelations;
