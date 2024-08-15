import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../global/models/base.entity';
import { Author } from './author.entity';
import { Gender } from './gender.entity';

@Entity()
export class Book extends BaseEntity {
  @Column()
  title: string;

  @ManyToOne(() => Author, (Author) => Author.books)
  author: Author;

  @Column()
  publishedDate: Date;

  @ManyToOne(() => Gender, (Gender) => Gender.books)
  gender: Gender;

  @Column()
  quantity: number;
}
