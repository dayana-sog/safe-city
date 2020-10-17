import {Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn} from "typeorm";
import Image from './Image'

@Entity('safe_city')
export default class Orphanage {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column()
  latitude: number;

  @Column()
  longitude: number;

  @Column()
  about: string;

  @Column()
  when_hours: string;

  @Column()
  reported_crime: boolean;

  @Column()
  phone: string;

  @OneToMany(() => Image, image => image.safeCity, {
    cascade: ['insert', 'update']
  })
  @JoinColumn({ name: 'safe_city_id' })
  images: Image[]
}