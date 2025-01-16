import { PrimaryGeneratedColumn, Column, Entity, OneToOne, JoinColumn, OneToMany, JoinTable } from "typeorm";

@Entity('usuario')
export class Usuario {
    @PrimaryGeneratedColumn({name: 'id'})
    id: number

    @Column({name: 'fullname', length: 100, nullable: false})
    fullname: string

    @Column({name: 'email', length: 100, nullable: false})
    email: string

    @Column({name: 'username', unique: true, nullable: false})
    username: string

    @Column({name: 'password', nullable: false})
    password: string 
}