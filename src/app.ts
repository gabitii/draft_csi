import 'reflect-metadata';
import express from 'express';
import dotenv from 'dotenv';
import { AppDataSource } from './config/data-source';
import carPartRoutes from './routes/CarPartRoutes'
import cors from 'cors';



const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors({
    origin: 'http://localhost:5173', // разрешаем фронту
    methods: ['GET', 'POST', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type'],
}));
dotenv.config();
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

