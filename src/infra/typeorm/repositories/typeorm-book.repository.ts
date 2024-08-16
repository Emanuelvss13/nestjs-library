import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBookDto } from '../../../book/dto/create-book.dto';
import { UpdateBookDto } from '../../../book/dto/update-book.dto';
import { Book } from '../../../book/models/book.entity';
import { IBookRepository } from '../../../book/models/book.repository';

@Injectable()
export class BookRepository implements IBookRepository {
  constructor(
    @InjectRepository(Book)
    private typeorm: Repository<Book>,
  ) {}

  async updateById(
    id: string,
    { genderId, authorId, ...data }: UpdateBookDto,
  ): Promise<Book> {
    await this.typeorm.update(
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

    return await this.typeorm.findOne({
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

  async findAll(): Promise<Book[]> {
    const books = await this.typeorm.find({
      relations: {
        author: true,
        gender: true,
      },
    });

    return books;
  }

  async findById(id: string): Promise<Book> {
    const book = await this.typeorm.findOne({
      where: {
        id,
      },
      relations: {
        author: true,
        gender: true,
      },
    });

    return book;
  }

  async deleteById(id: string): Promise<void> {
    await this.typeorm.delete({ id });
  }
}
