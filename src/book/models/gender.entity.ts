import { Column, Entity, ManyToOne } from 'typeorm';
import { Book } from './book.entity';

@Entity()
export class Gender {
  @Column()
  id: string;

  @Column()
  description: string;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @ManyToOne((type) => Book, (Book) => Book.gender)
  books: Book[];
}
