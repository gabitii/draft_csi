import { Request, Response } from 'express';
import { CarPartService } from '../services/CarPartService';

const service = new CarPartService();

export class CarPartController {
    async getAll(req: Request, res: Response) {
        try {
            const parts = await service.getAllParts();
            res.json(parts);
        } catch (error) {
            console.error('Ошибка в getAll:', error); // <--- добавь это
            res.status(500).json({ message: 'Ошибка сервера' });
        }
    }

    async create(req: Request, res:Response) {
        try{
            const part = await service.createPart(req.body);
            res.status(201).json(part);
        }catch (error){
            console.error("Ошибка в create: ", error);
            res.status(400).json({message: (error as Error).message})
        }
    }

    async clearAll(req: Request, res: Response) {
        try {
            await service.clearAllParts();
            res.status(200).json({ message: 'Очищено' });
        } catch (err) {
            res.status(500).json({ message: 'Ошибка сервера' });
        }
    }

    async delete(req: Request, res: Response){
        try{
            await service.deletePart(req.params.id);
            res.status(200).json({message: 'Деталь удалена'});
        }catch (err){
            res.status(404).json({message: (err as Error).message})
        }
    }
    async export(req: Request, res: Response) {
        const format = (req.query.format as string) || 'xlsx';
        try {
            await service.exportParts(format as 'xlsx' | 'pdf', res);
        } catch (err) {
            res.status(500).json({ message: 'Ошибка экспорта' });
        }
    }
}
