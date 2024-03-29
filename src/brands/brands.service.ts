import { Injectable, NotFoundException } from '@nestjs/common'
import { v4 as uuid } from 'uuid'
import { CreateBrandDto } from './dto/create-brand.dto'
import { UpdateBrandDto } from './dto/update-brand.dto'
import { Brand } from './entities/brand.entity'

@Injectable()
export class BrandsService {
  private brands: Brand[] = [
    /*  {
      id: uuid(),
      name: 'Toyota',
      createdAt: new Date().getTime(),
    }, */
  ]

  create(createBrandDto: CreateBrandDto) {
    const { name } = createBrandDto
    const brand: Brand = {
      id: uuid(),
      name: name.toLocaleLowerCase(),
      createdAt: new Date().getTime(),
    }

    this.brands.push(brand)
    return brand
  }

  findAll() {
    return this.brands
  }

  findOne(id: string) {
    const brand = this.brands.find((b) => b.id === id)
    if (!brand) throw new NotFoundException(`Brand ${id} not found`)

    return brand
  }

  update(id: string, updateBrandDto: UpdateBrandDto) {
    let brandFound = this.findOne(id)

    this.brands = this.brands.map((brand) => {
      if (brand.id === id) {
        brandFound.updatedAt = new Date().getTime()
        brandFound = { ...brandFound, ...updateBrandDto, id }

        return brandFound
      }
      return brand
    })

    return brandFound
  }

  remove(id: string) {
    this.brands = this.brands.filter((b) => b.id !== id)
  }

  fillCarsWithSeedData(brands: Brand[]) {
    this.brands = brands
  }
}
