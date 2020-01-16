import {Model, model, property, Entity} from '@loopback/repository';
import { type } from 'os';
import { constructor } from 'uuid';

@model({settings: {strict: false}})
export class SourcesBdd extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  _id?: string;

  @property({
    type: 'string',
    required: true,
  })
  fileName: string;

  @property({
    type: 'string',
    required: false,
  })
 title?: string;

  @property({
    type: 'string',
    required: false,
  })
  owner?: string;

  @property({
    type: 'date',
    required: true,
  })
  date: Date;

  @property({
    type: 'string',
    required: true,
  })
  typemime: string;

  @property({
    type: 'string',
    require: true,
  })
  description: string;

  @property({
    type: 'number',
    required: true,
  })
  size: number;


  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<SourcesBdd>) {
    super(data);
  }
}

export interface SourcesBddRelations {
  // describe navigational properties here
}

export type SourcesBddWithRelations = SourcesBdd & SourcesBddRelations;
