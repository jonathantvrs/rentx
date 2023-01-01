import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";

import { ICarsRepository } from "../ICarsRepository";

class CarsRepositoryInMemory implements ICarsRepository {
  cars: Car[] = [];

  async create({
    name,
    description,
    fine_amount,
    license_plate,
    daily_rate,
    brand,
    category_id,
    specifications,
    id,
  }: ICreateCarDTO): Promise<Car> {
    const car = new Car();

    Object.assign(car, {
      name,
      description,
      fine_amount,
      license_plate,
      daily_rate,
      brand,
      category_id,
      specifications,
      id,
    });

    this.cars.push(car);

    return car;
  }

  async findByLicensePlate(license_plate: string): Promise<Car> {
    return this.cars.find((car) => car.license_plate === license_plate);
  }

  async findAvailable(
    brand?: string,
    category_id?: string,
    name?: string
  ): Promise<Car[]> {
    // const availableCars = this.cars
    //   .filter((car) => car.available === true)
    //   .filter(
    //     (car) =>
    //       (brand && car.brand === brand) ||
    //       (category_id && car.category_id === category_id) ||
    //       (name && car.name === name)
    //   );
    // const availableCars = this.cars.filter((car) => {
    //   if (
    //     car.available === true ||
    //     (brand && car.brand === brand) ||
    //     (category_id && car.category_id === category_id) ||
    //     (name && car.name === name)
    //   ) {
    //     return car;
    //   }
    //   return null;
    // });
    const availableCars = this.cars.filter((c) => {
      return (
        c.available === true &&
        (!name || name === c.name) &&
        (!brand || brand === c.brand) &&
        (!category_id || category_id === c.category_id)
      );
    });

    return availableCars;
  }

  async findById(id: string): Promise<Car> {
    return this.cars.find((car) => car.id === id);
  }

  async updateAvailable(id: string, available: boolean): Promise<void> {
    const findIndex = this.cars.findIndex((car) => car.id === id);
    this.cars[findIndex].available = available;
  }
}

export { CarsRepositoryInMemory };
