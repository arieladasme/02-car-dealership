import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common'
import { CarsService } from './cars.service'

@Controller('cars')
export class CarsController {
  constructor(private readonly carService: CarsService) {}

  @Get()
  getAllCars() {
    return this.carService.findAll()
  }

  @Get(':id')
  getCarById(@Param('id') id: string) {
    return this.carService.findOneById(id)
  }

  @Post()
  createCar(@Body() body: any) {
    return body
  }

  @Patch(':id')
  updateCar(@Param('id') id: string, @Body() body: any) {
    return body
  }

  @Delete(':id')
  deleteCar(@Param('id') id: string) {
    return {
      method: 'delete',
      id,
    }
  }
}
