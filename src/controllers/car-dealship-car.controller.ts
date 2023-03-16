import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  CarDealship,
  Car,
} from '../models';
import {CarDealshipRepository} from '../repositories';

export class CarDealshipCarController {
  constructor(
    @repository(CarDealshipRepository) protected carDealshipRepository: CarDealshipRepository,
  ) { }

  @get('/car-dealships/{id}/cars', {
    responses: {
      '200': {
        description: 'Array of CarDealship has many Car',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Car)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Car>,
  ): Promise<Car[]> {
    return this.carDealshipRepository.cars(id).find(filter);
  }

  @post('/car-dealships/{id}/cars', {
    responses: {
      '200': {
        description: 'CarDealship model instance',
        content: {'application/json': {schema: getModelSchemaRef(Car)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof CarDealship.prototype.name,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Car, {
            title: 'NewCarInCarDealship',
            exclude: ['id'],
            optional: ['carDealshipName']
          }),
        },
      },
    }) car: Omit<Car, 'id'>,
  ): Promise<Car> {
    return this.carDealshipRepository.cars(id).create(car);
  }

  @patch('/car-dealships/{id}/cars', {
    responses: {
      '200': {
        description: 'CarDealship.Car PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Car, {partial: true}),
        },
      },
    })
    car: Partial<Car>,
    @param.query.object('where', getWhereSchemaFor(Car)) where?: Where<Car>,
  ): Promise<Count> {
    return this.carDealshipRepository.cars(id).patch(car, where);
  }

  @del('/car-dealships/{id}/cars', {
    responses: {
      '200': {
        description: 'CarDealship.Car DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Car)) where?: Where<Car>,
  ): Promise<Count> {
    return this.carDealshipRepository.cars(id).delete(where);
  }
}
