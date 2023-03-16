import {Entity, model, property, hasMany} from '@loopback/repository';
import {Adresse} from './adresse.model';
import {Car} from './car.model';

@model({settings: {strict: false}})
export class CarDealship extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
    required: true,
  })
  name: string;

  @property({
    type: Adresse,
    required: true,
  })
  address: Adresse;

  @property({
    type: 'string',
    required: true,
  })
  phoneNumber: string;

  @hasMany(() => Car, {keyTo: 'carDealshipName'})
  cars: Car[];
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<CarDealship>) {
    super(data);
  }
}

export interface CarDealshipRelations {
  // describe navigational properties here
}

export type CarDealshipWithRelations = CarDealship & CarDealshipRelations;
