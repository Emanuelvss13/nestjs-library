import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '../../global/models/base.entity';
import { Book } from './book.entity';

@Entity()
export class Author extends BaseEntity {
  @Column()
  name: string;

  @OneToMany(() => Book, (Book) => Book.author)
  books: Book[];
}
