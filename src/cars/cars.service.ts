import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { v4 as uuid } from 'uuid'
import { CreateCarDto, UpdateCarDto } from './dto'
import { Car } from './interfaces/car.interface'

@Injectable()
export class CarsService {
  private cars: Car[] = [
    {
      id: uuid(),
      brand: 'Toyota',
      model: 'Corolla',
    },
    {
      id: uuid(),
      brand: 'Honda',
      model: 'Civic',
    },
    {
      id: uuid(),
      brand: 'Jeep',
      model: 'Cherokee',
    },
  ]

  findAll() {
    return this.cars
  }

  findOneById(id: string) {
    const car = this.cars.find((car) => car.id === id)
    if (!car) throw new NotFoundException(`Car '${id}' not found`)

    return car
  }

  create(createCarDto: CreateCarDto) {
    const car: Car = {
      id: uuid(),
      ...createCarDto,
    }

    this.cars.push(car)

    return car
  }

  update(id: string, updateCarDto: UpdateCarDto) {
    let carFound = this.findOneById(id)

    // optional
    if (updateCarDto.id && updateCarDto.id !== id)
      throw new BadRequestException(`Car id is not valid inside body`)

    this.cars = this.cars.map((car) => {
      if (car.id === id) {
        carFound = { ...carFound, ...updateCarDto, id }

        return carFound
      }
      return car
    })

    return carFound
  }

  delete(id: string) {
    this.cars = this.cars.filter((car) => car.id !== id)
  }

  fillCarsWithSeedData(cars: Car[]) {
    this.cars = cars
  }
}
