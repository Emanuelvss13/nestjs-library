import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '../../global/models/base.entity';
import { Author } from './author.entity';
import { Gender } from './gender.entity';

@Entity()
export class Book extends BaseEntity {
  @Column()
  title: string;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @OneToMany((type) => Author, (Author) => Author.books)
  author: Author;

  @Column()
  publishedDate: Date;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @OneToMany((type) => Gender, (Gender) => Gender.books)
  gender: Gender;

  @Column()
  quantity: number;
}
