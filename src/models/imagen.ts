import{Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import Orphanage from './Orphanege';

@Entity('images')
export default class Image {
    @PrimaryGeneratedColumn('increment')
    id: number;
    @Column()
    path: string;

    @ManyToOne(() => Orphanage, orphanege => orphanege.images)
    @JoinColumn({name: 'orphanage_id'})

    orphanege: Orphanage;
    

}