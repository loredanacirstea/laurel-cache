import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class Web3C extends Entity {
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
  output: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Web3C>) {
    super(data);
  }
}

export interface Web3CRelations {
  // describe navigational properties here
}

export type Web3CWithRelations = Web3C & Web3CRelations;
