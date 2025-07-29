import { carPartRepo } from '../repositories/CarPartRepository';
import { CarPart} from '../entities/CarPart';
import {FindManyOptions} from 'typeorm';
import {IsNull} from 'typeorm';
import ExcelJS from 'exceljs';
import PDFDocument from 'pdfkit';
import { Response } from 'express';


export class CarPartService {
    async getAllParts(): Promise<CarPart[]> {
        console.log('getAllParts() called');
        return carPartRepo.find(<FindManyOptions<CarPart>>{
            where: { parent: IsNull() },
            relations: ['children'],
        });
    }

    async createPart(data: {
        name: string;
        price: number;
        quantity: number;
        parentId?: string;
    }): Promise<CarPart> {
        const part = new CarPart();
        part.name = data.name;
        part.price = data.price;
        part.quantity = data.quantity;

        if (data.parentId) {
            const parent = await carPartRepo.findOneBy({ id: data.parentId });
            if (!parent) throw new Error('Родитель не найден');
            part.parent = parent;
        }
        const saved = await carPartRepo.save(part);

        await this.recalculateParentPrice(saved);

        const reloaded = await carPartRepo.findOne({
            where: { id: saved.id },
            relations: ['parent'],
        });

        if (!reloaded) {
            return saved;
        }

        return reloaded;
    }

    async deletePart(id: string): Promise<void>{
        const part = await carPartRepo.findOne({
            where:{id},
            relations:['parent'],
        })
        if(!part){
            throw new Error('деталь не найдена')
        }
        if(part.parent){
            part.parent.price -= part.price*part.quantity;
            await carPartRepo.save(part.parent);
            await this.recalculateParentPrice(part.parent);
        }

        await carPartRepo.remove(await this.getAllDescendants(part));
    }

    private async recalculateParentPrice(part: CarPart): Promise<number>{
        const parent = await carPartRepo.findOne({
            where: { id: part.parentId },
        });

        if (!parent || !part.parentId) {
            return part.price;
        }
        parent.price += part.price * part.quantity;

        await carPartRepo.save(parent);

        return this.recalculateParentPrice(parent);
    }

    private async getAllDescendants(part: CarPart): Promise<CarPart[]>{
        const children = await carPartRepo.find({
            where: {parentId: part.id},
            relations:['children'],
        });
        if(!children){
            return [part];
        }
        let all: CarPart[] =[];
        for (const child of children){
            all = all.concat(await this.getAllDescendants(child));
        }
        return [part, ...all]
    }

    async clearAllParts(): Promise<void> {
        await carPartRepo.clear(); // удаляет все записи в таблице car_part
    }

    async exportParts(format: 'xlsx' | 'pdf', res: Response): Promise<void>{
        const parts = await carPartRepo.find({relations: ['parent']});

        if (format === 'xlsx'){
            const workbook = new ExcelJS.Workbook();
            const sheet = workbook.addWorksheet('CarParts');

            sheet.addRow(['ID', 'Name', 'Price', 'Quantity', 'ParentID']);

            parts.forEach(p=>{
                sheet.addRow([p.id, p.name, p.price, p.quantity, p.parent?.id || 'ROOT']);
            })

            res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
            res.setHeader('Content-Disposition', 'attachment; filename=carparts.xlsx');
            await workbook.xlsx.write(res);
            res.end();
        }

        if(format == 'pdf'){
            const doc = new PDFDocument();
            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', 'attachment; filename=carparts.pdf');
            doc.pipe(res);

            doc.fontSize(16).text('Car Parts Report', { underline: true });
            doc.moveDown();

            parts.forEach(p => {
                doc.fontSize(12).text(`Name: ${p.name} | Price: ${p.price} | Qty: ${p.quantity} | Parent: ${p.parent?.id || 'ROOT'}`);
            });

            doc.end();
        }


    }
}
