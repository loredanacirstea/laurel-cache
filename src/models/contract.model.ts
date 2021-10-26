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
    postgresql: {
      dataType: 'VARCHAR',
      dataLength: 42,
    },
  })
  address: string;

  @property({
    type: 'string',
    required: false,
  })
  bytecode: string; // runtimeBytecode

  @property({
    type: 'string',
    required: false,
  })
  compiledBytecode: string;

  @property({
    type: 'string',
    required: false,
    default: '',
  })
  constructorArgs: string;

  @property({
    name: 'function_sighashes',
    type: 'array',
    itemType: 'string',
    required: false,
    default: [],
  })
  functionSighashes: string[];

  @property({
    type: 'number',
    required: true,
  })
  chainid: number;

  @property({
    type: 'string',
    required: true,
    postgresql: {
      dataType: "bigint",
    },
  })
  lastExecutedBlock: string;

  @property({
    type: 'string',
    required: true,
    default: '0',
    postgresql: {
      dataType: "bigint",
    },
  })
  balance: string;

  @property({
    type: 'array',
    itemType: 'object',
    required: false,
    default: [],
    postgresql: {
      dataType: "jsonb",
    },
  })
  abi: object;

  constructor(data?: Partial<Contract>) {
    super(data);
  }
}

export interface ContractRelations {
  // describe navigational properties here
}

export type ContractWithRelations = Contract & ContractRelations;
