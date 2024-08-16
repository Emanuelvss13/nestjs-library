import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBookDto } from '../../../book/dto/create-book.dto';
import { FindAllDto } from '../../../book/dto/find-all-books.dto';
import { ReservationDto } from '../../../book/dto/reservation.dot';
import { UpdateBookDto } from '../../../book/dto/update-book.dto';
import { Book } from '../../../book/models/book.entity';
import { IBookRepository } from '../../../book/models/book.repository';
import { Reservation } from '../../../book/models/reservation.entity';

@Injectable()
export class BookRepository implements IBookRepository {
  constructor(
    @InjectRepository(Book)
    private typeormBook: Repository<Book>,
    @InjectRepository(Reservation)
    private typeormReservation: Repository<Reservation>,
  ) {}

  async reservation(data: ReservationDto, book: Book): Promise<Reservation> {
    const reservation = await this.typeormReservation.save({ ...data });

    await this.typeormBook.decrement(
      {
        id: data.bookId,
      },
      'quantity',
      1,
    );

    book.reservations.push(reservation);

    await this.typeormBook.save(book);

    return reservation;
  }

  async updateById(
    id: string,
    { genderId, authorId, ...data }: UpdateBookDto,
  ): Promise<Book> {
    await this.typeormBook.update(
      {
        id,
      },
      {
        ...data,
        ...(genderId && {
          gender: {
            id: genderId,
          },
        }),
        ...(authorId && {
          author: {
            id: authorId,
          },
        }),
      },
    );

    return await this.typeormBook.findOne({
      where: {
        id,
      },
      relations: {
        author: true,
        gender: true,
      },
    });
  }

  async create({ authorId, genderId, ...data }: CreateBookDto): Promise<Book> {
    const book = await this.typeormBook.save({
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

  async findAll({
    authorId,
    genderId,
    publishedYear,
  }: FindAllDto): Promise<Book[]> {
    const query = this.typeormBook
      .createQueryBuilder('book')
      .leftJoinAndSelect('book.author', 'author')
      .leftJoinAndSelect('book.gender', 'gender');

    if (genderId) {
      query.andWhere('gender.id = :genderId', { genderId });
    }

    if (authorId) {
      query.andWhere('author.id = :authorId', { authorId });
    }

    if (publishedYear) {
      query.andWhere('EXTRACT(YEAR FROM book.publishedDate) = :publishedYear', {
        publishedYear,
      });
    }

    return await query.getMany();
  }

  async findById(id: string): Promise<Book> {
    const book = await this.typeormBook.findOne({
      where: {
        id,
      },
      relations: {
        author: true,
        gender: true,
        reservations: true,
      },
    });

    return book;
  }

  async deleteById(id: string): Promise<void> {
    await this.typeormBook.delete({ id });
  }
}
