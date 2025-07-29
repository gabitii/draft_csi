import {DataSource} from 'typeorm';
import dotenv from 'dotenv';
import {CarPart} from '../entities/CarPart';

dotenv.config();

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST as string,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME as string,
    password: process.env.DB_PASSWORD as string,
    database: process.env.DB_NAME as string,
    synchronize: true,
    logging: false,
    entities: [CarPart],
});

