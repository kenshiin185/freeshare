import {Model, model, property, Entity} from '@loopback/repository';

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
    required: true,
  })
 title: string;

  @property({
    type: 'string',
    required: true,
  })
  owner: string;

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
    required: true,
  })
  size: string;


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
