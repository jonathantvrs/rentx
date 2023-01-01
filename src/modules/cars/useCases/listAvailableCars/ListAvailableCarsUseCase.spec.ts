import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";

import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("List Cars", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(
      carsRepositoryInMemory
    );
  });

  it("should be able to list all available cars", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car name",
      description: "Car description",
      daily_rate: 110.0,
      license_plate: "DEF - 1234",
      fine_amount: 40,
      brand: "Car Brand",
      category_id: "Car Category",
    });

    const cars = await listAvailableCarsUseCase.execute({});

    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by name", async () => {
    const car1 = await carsRepositoryInMemory.create({
      name: "Car name",
      description: "Car description",
      daily_rate: 110.0,
      license_plate: "DEF - 1234",
      fine_amount: 40,
      brand: "Car Brand",
      category_id: "Car Category",
    });

    const cars = await listAvailableCarsUseCase.execute({
      name: "Car name",
    });

    expect(cars).toEqual([car1]);
  });

  it("should be able to list all available cars by brand", async () => {
    const car2 = await carsRepositoryInMemory.create({
      name: "Car 2",
      description: "Car description",
      daily_rate: 110.0,
      license_plate: "DEF - 1234",
      fine_amount: 40,
      brand: "Car Brand Test",
      category_id: "Car Category",
    });

    const cars = await listAvailableCarsUseCase.execute({
      brand: "Car Brand Test",
    });

    expect(cars).toEqual([car2]);
  });

  it("should be able to list all available cars by category", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car name",
      description: "Car description",
      daily_rate: 110.0,
      license_plate: "DEF - 1234",
      fine_amount: 40,
      brand: "Car Brand",
      category_id: "Cat1",
    });

    const cars = await listAvailableCarsUseCase.execute({
      category_id: "Cat1",
    });

    expect(cars).toEqual([car]);
  });
});
