import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {CarDealship} from '../models';
import {CarDealshipRepository} from '../repositories';

export class CarDealershipController {
  constructor(
    @repository(CarDealshipRepository)
    public carDealshipRepository : CarDealshipRepository,
  ) {}

  @post('/dealership')
  @response(200, {
    description: 'CarDealship model instance',
    content: {'application/json': {schema: getModelSchemaRef(CarDealship)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CarDealship, {
            title: 'NewCarDealship',
            
          }),
        },
      },
    })
    carDealship: CarDealship,
  ): Promise<CarDealship> {
    return this.carDealshipRepository.create(carDealship);
  }

  @get('/dealership/count')
  @response(200, {
    description: 'CarDealship model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(CarDealship) where?: Where<CarDealship>,
  ): Promise<Count> {
    return this.carDealshipRepository.count(where);
  }

  @get('/dealership')
  @response(200, {
    description: 'Array of CarDealship model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(CarDealship, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(CarDealship) filter?: Filter<CarDealship>,
  ): Promise<CarDealship[]> {
    return this.carDealshipRepository.find(filter);
  }

  @patch('/dealership')
  @response(200, {
    description: 'CarDealship PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CarDealship, {partial: true}),
        },
      },
    })
    carDealship: CarDealship,
    @param.where(CarDealship) where?: Where<CarDealship>,
  ): Promise<Count> {
    return this.carDealshipRepository.updateAll(carDealship, where);
  }

  @get('/dealership/{id}')
  @response(200, {
    description: 'CarDealship model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(CarDealship, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(CarDealship, {exclude: 'where'}) filter?: FilterExcludingWhere<CarDealship>
  ): Promise<CarDealship> {
    return this.carDealshipRepository.findById(id, filter);
  }

  @patch('/dealership/{id}')
  @response(204, {
    description: 'CarDealship PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CarDealship, {partial: true}),
        },
      },
    })
    carDealship: CarDealship,
  ): Promise<void> {
    await this.carDealshipRepository.updateById(id, carDealship);
  }

  @put('/dealership/{id}')
  @response(204, {
    description: 'CarDealship PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() carDealship: CarDealship,
  ): Promise<void> {
    await this.carDealshipRepository.replaceById(id, carDealship);
  }

  @del('/dealership/{id}')
  @response(204, {
    description: 'CarDealship DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.carDealshipRepository.deleteById(id);
  }
}
