import { AppDataSource } from '../config/data-source';
import { CarPart } from '../entities/CarPart';

export const carPartRepo = AppDataSource.getRepository(CarPart);