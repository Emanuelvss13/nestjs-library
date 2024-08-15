import { Inject, Injectable } from '@nestjs/common';
import { REPOSITORIES } from '../global/repositories/repositories.enum';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { IBookRepository } from './models/book.repository';

@Injectable()
export class BookService {
  constructor(
    @Inject(REPOSITORIES.BOOK)
    readonly bookRepository: IBookRepository,
  ) {}

  async create(data: CreateBookDto) {
    const book = await this.bookRepository.create(data);

    return book;
  }

  findAll() {
    return `This action returns all book`;
  }

  findOne(id: number) {
    return `This action returns a #${id} book`;
  }

  update(id: number, updateBookDto: UpdateBookDto) {
    return `This action updates a #${id} book`;
  }

  remove(id: number) {
    return `This action removes a #${id} book`;
  }
}
