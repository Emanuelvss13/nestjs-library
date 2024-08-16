import { CreateBookDto } from '../dto/create-book.dto';
import { FindAllDto } from '../dto/find-all-books.dto';
import { UpdateBookDto } from '../dto/update-book.dto';
import { Book } from './book.entity';

export interface IBookRepository {
  create(data: CreateBookDto): Promise<Book>;
  findAll(query: FindAllDto): Promise<Book[]>;
  updateById(id: string, data: UpdateBookDto): Promise<Book>;
  findById(id: string): Promise<Book>;
  deleteById(id: string): Promise<void>;
}
