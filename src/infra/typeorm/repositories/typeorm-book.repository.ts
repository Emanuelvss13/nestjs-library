import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBookDto } from '../../../book/dto/create-book.dto';
import { Book } from '../../../book/models/book.entity';
import { IBookRepository } from '../../../book/models/book.repository';

@Injectable()
export class BookRepository implements IBookRepository {
  constructor(
    @InjectRepository(Book)
    private typeorm: Repository<Book>,
  ) {}

  async create({ authorId, genderId, ...data }: CreateBookDto): Promise<Book> {
    const book = await this.typeorm.save({
      ...data,
      author: {
        id: authorId,
      },
      gender: {
        id: genderId,
      },
    });

    return book;
  }
  findAll(): Promise<Book[]> {
    throw new Error('Method not implemented.');
  }
  findById(id: string): Promise<Book> {
    console.log(id);

    throw new Error('Method not implemented.');
  }
  deleteById(id: string): Promise<void> {
    console.log(id);
    throw new Error('Method not implemented.');
  }
}
