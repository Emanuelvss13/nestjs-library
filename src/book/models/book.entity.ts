import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../global/models/base.entity';
import { Author } from './author.entity';
import { Gender } from './gender.entity';

@Entity()
export class Book extends BaseEntity {
  @Column()
  title: string;

  @Column()
  author: Author;

  @Column()
  publishedDate: Date;

  @Column()
  gender: Gender;

  @Column()
  quantity: number;
}
