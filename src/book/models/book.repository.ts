import { CreateBookDto } from '../dto/create-book.dto';
import { UpdateBookDto } from '../dto/update-book.dto';
import { Book } from './book.entity';

export interface IBookRepository {
  create(data: CreateBookDto): Promise<Book>;
  findAll(): Promise<Book[]>;
  updateById(id: string, data: UpdateBookDto): Promise<Book>;
  findById(id: string): Promise<Book>;
  deleteById(id: string): Promise<void>;
}
