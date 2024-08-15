import { Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../global/models/base.entity';
import { Book } from './book.entity';

@Entity()
export class Author extends BaseEntity {
  name: string;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @ManyToOne((type) => Book, (Book) => Book.author)
  books: Book[];
}
