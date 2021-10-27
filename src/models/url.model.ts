import {Entity, model, property} from '@loopback/repository';
import {OutgoingHttpHeaders} from 'http';

@model({settings: {strict: false}})
export class Url extends Entity {
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
  url: string;

  @property({
    type: 'object',
    required: true,
    postgresql: {
      dataType: "jsonb",
    },
  })
  headers: OutgoingHttpHeaders;

  @property({
    type: 'date',
    required: true,
  })
  createdAt: Date;

  @property({
    type: 'string',
    required: true,
    postgresql: {
      dataType: "text",
    },
  })
  content: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Url>) {
    super(data);
  }
}

export interface UrlRelations {
  // describe navigational properties here
}

export type UrlWithRelations = Url & UrlRelations;
