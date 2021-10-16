import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    postgresql: {
      table: 'contracts',
    },
  },
})
export class Contract extends Entity {
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
  address: string;

  @property({
    type: 'string',
    required: true,
  })
  bytecode: string;

  @property({
    type: 'array',
    itemType: 'string',
    required: true,
  })
  function_sighashes: string[];

  @property({
    type: 'number',
    required: true,
  })
  chainid: number;


  constructor(data?: Partial<Contract>) {
    super(data);
  }
}

export interface ContractRelations {
  // describe navigational properties here
}

export type ContractWithRelations = Contract & ContractRelations;
