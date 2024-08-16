import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { REPOSITORIES } from '../global/repositories/repositories.enum';
import { BookRepository } from '../infra/typeorm/repositories/typeorm-book.repository';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import { Author } from './models/author.entity';
import { Book } from './models/book.entity';
import { Gender } from './models/gender.entity';
import { Reservation } from './models/reservation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Book, Author, Gender, Reservation])],
  controllers: [BookController],
  providers: [
    BookService,
    {
      provide: REPOSITORIES.BOOK,
      useClass: BookRepository,
    },
  ],
})
export class BookModule {}
