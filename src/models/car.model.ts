import {Entity, model, property} from '@loopback/repository';

@model()
export class Car extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  make: string;

  @property({
    type: 'string',
    required: true,
  })
  model?: string;

  @property({
    type: 'number',
    required: true,
  })
  price?: number;

  constructor(data?: Partial<Car>) {
    super(data);
  }
}

export interface CarRelations {
  // describe navigational properties here
}

export type CarWithRelations = Car & CarRelations;
