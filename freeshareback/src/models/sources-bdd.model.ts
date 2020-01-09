import {Model, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class SourcesBdd extends Model {
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
    required: true,
  })
  pictName: string;

  @property({
    type: 'string',
    required: true,
  })
  Owner: string;

  @property({
    type: 'date',
    required: true,
  })
  date: string;

  @property({
    type: 'string',
    required: true,
  })
  type: string;

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
