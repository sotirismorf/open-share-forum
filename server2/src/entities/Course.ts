import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class Course {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    codename: string;

    @Column()
    semester: number;

    @Column()
    repository: number;
}
