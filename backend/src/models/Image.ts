import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn} from "typeorm";

import SafeCity from './SafeCity';

@Entity('images')
export default class Image {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  path: string;

  @ManyToOne(() => SafeCity, city => city.images)
  @JoinColumn({ name: 'safe_city_id' })
  safeCity: SafeCity;
};