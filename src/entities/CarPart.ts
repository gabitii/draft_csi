import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    OneToMany, JoinColumn,
} from 'typeorm';

@Entity()
export class CarPart {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column()
    name!: string;

    @Column()
    quantity!: number;

    @Column()
    price!: number;

    @Column( { default: 0 })
    basePrice!: number;

    @ManyToOne(() => CarPart, (part) => part.children, {onDelete: "CASCADE"})
    @JoinColumn({ name: 'parentId' })
    parent!: CarPart;

    @Column({ nullable: true })
    parentId!: string;

    @OneToMany(() => CarPart, (part) => part.parent,{cascade: true})
    children!: CarPart[];
}