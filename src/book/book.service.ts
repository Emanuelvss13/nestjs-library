import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { REPOSITORIES } from '../global/repositories/repositories.enum';
import { CreateBookDto } from './dto/create-book.dto';
import { FindAllDto } from './dto/find-all-books.dto';
import { ReservationDto } from './dto/reservation.dot';
import { UpdateBookDto } from './dto/update-book.dto';
import { IBookRepository } from './models/book.repository';

@Injectable()
export class BookService {
  constructor(
    @Inject(REPOSITORIES.BOOK)
    readonly bookRepository: IBookRepository,
  ) {}

  async reservation(data: ReservationDto) {
    const book = await this.findById(data.bookId);

    return await this.bookRepository.reservation(data, book);
  }

  async create(data: CreateBookDto) {
    return await this.bookRepository.create(data);
  }

  async findAll(query: FindAllDto) {
    return await this.bookRepository.findAll(query);
  }

  async findById(id: string) {
    const book = await this.bookRepository.findById(id);

    if (!book) throw new BadRequestException('Livro não encontrado');

    return book;
  }

  async update(id: string, updateBookDto: UpdateBookDto) {
    await this.findById(id);

    return await this.bookRepository.updateById(id, updateBookDto);
  }

  async delete(id: string) {
    await this.findById(id);

    return await this.bookRepository.deleteById(id);
  }
}
