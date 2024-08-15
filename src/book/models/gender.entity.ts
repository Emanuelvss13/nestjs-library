import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '../../global/models/base.entity';
import { Book } from './book.entity';

@Entity()
export class Gender extends BaseEntity {
  @Column()
  description: string;

  @OneToMany(() => Book, (Book) => Book.gender)
  books: Book[];
}
