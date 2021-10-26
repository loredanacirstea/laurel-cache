import {belongsTo, Entity, model, property} from '@loopback/repository';
import {Contract} from './contract.model';

@model()
export class State extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
    required: false,
  })
  id: number;

  @property({
    type: 'string',
    required: true,
  })
  key: string;

  @property({
    type: 'string',
    required: true,
  })
  value: string;

  @property({
    type: 'string',
    required: true,
  })
  lastModifiedTx: string;

  @property({
    name: 'transaction_index',
    type: 'number',
    required: true,
    postgresql: {
      dataType: "int",
    },
  })
  transactionIndex: number;

  @property({
    name: 'block_number',
    type: 'string',
    required: true,
    postgresql: {
      dataType: "bigint",
    },
  })
  blockNumber: string;

  // @property({
  //   type: 'number',
  //   required: true,
  // })
  // contractId: number;

  @belongsTo(() => Contract)
  contractId: string;

  constructor(data?: Partial<State>) {
    super(data);
  }
}

export interface StateRelations {
  // describe navigational properties here
}

export type StateWithRelations = State & StateRelations;
