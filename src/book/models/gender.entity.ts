import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../global/models/base.entity';
import { Book } from './book.entity';

@Entity()
export class Gender extends BaseEntity {
  @Column()
  description: string;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @ManyToOne((type) => Book, (Book) => Book.gender)
  books: Book[];
}
