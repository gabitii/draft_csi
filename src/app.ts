import 'reflect-metadata';
import express from 'express';
import dotenv from 'dotenv';
import { AppDataSource } from './config/data-source';
import carPartRoutes from './routes/CarPartRoutes'

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json())
app.use("/parts", carPartRoutes);
app.get('/', (req, res) => {
    res.send('Сервер работает!');
});

AppDataSource.initialize()
    .then(() => {
        console.log('✅ Подключено к PostgreSQL');
        app.listen(PORT, () => {
            console.log(`🚀 Сервер запущен на порту ${PORT}`);
        });
    })
    .catch((err) => {
        console.error('❌ Ошибка подключения к БД:', err);
    });

app.use("/parts", carPartRoutes)

