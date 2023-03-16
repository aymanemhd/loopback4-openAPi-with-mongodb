import {Model, model, property} from '@loopback/repository';

@model()
export class Adresse extends Model {
  @property({
    type: 'string',
    required: true,
  })
  AdresseLine1: string;

  @property({
    type: 'string',
  })
  AdresseLine2?: string;

  @property({
    type: 'string',
    required: true,
  })
  city: string;

  @property({
    type: 'string',
    required: true,
  })
  state: string;

  @property({
    type: 'number',
    required: true,
  })
  zip: number;


  constructor(data?: Partial<Adresse>) {
    super(data);
  }
}

export interface AdresseRelations {
  // describe navigational properties here
}

export type AdresseWithRelations = Adresse & AdresseRelations;
