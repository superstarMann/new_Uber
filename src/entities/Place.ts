import {BaseEntity, Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn} from 'typeorm';

Entity()
class Place extends BaseEntity{
    @PrimaryGeneratedColumn() id: number;

    @Column({type:"text"})
    number: string

    @Column({type: "double precision", default: 0})
    lat: number

    @Column({type: "double precision", default: 0})
    lng: number

    @Column({type: "text"})
    adress: string

    @Column({type: "boolean", default: false})
    isFav: boolean

    @CreateDateColumn() createdAt: string
    @UpdateDateColumn() updatedAt: string
}

export default Place;