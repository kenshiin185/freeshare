import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class Utilisateurs extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  _id?: string;

  @property({
    type: 'string',
    required : false,
  })
  profile?: string;

  @property({
    type: 'string',
    required: true,
  })
  pseudo: string;

  @property({
    type: 'string',
    required: true,
  })
  mail: string;

  @property({
    type: 'string',
    required: true,
  })
  password: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Utilisateurs>) {
    super(data);
  }
}

export interface UtilisateursRelations {
  // describe navigational properties here
}

export type UtilisateursWithRelations = Utilisateurs & UtilisateursRelations;
