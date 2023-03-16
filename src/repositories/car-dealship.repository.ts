import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {CarDealship, CarDealshipRelations, Car} from '../models';
import {CarRepository} from './car.repository';

export class CarDealshipRepository extends DefaultCrudRepository<
  CarDealship,
  typeof CarDealship.prototype.name,
  CarDealshipRelations
> {

  public readonly cars: HasManyRepositoryFactory<Car, typeof CarDealship.prototype.name>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('CarRepository') protected carRepositoryGetter: Getter<CarRepository>,
  ) {
    super(CarDealship, dataSource);
    this.cars = this.createHasManyRepositoryFactoryFor('cars', carRepositoryGetter,);
    this.registerInclusionResolver('cars', this.cars.inclusionResolver);
  }
}
