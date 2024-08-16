import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookModule } from './book/book.module';
import { Author } from './book/models/author.entity';
import { Book } from './book/models/book.entity';
import { Gender } from './book/models/gender.entity';
import { Reservation } from './book/models/reservation.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5436,
      username: 'postgres',
      password: 'postgres',
      database: 'library',
      entities: [Book, Author, Gender, Reservation],
      synchronize: true,
    }),
    BookModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
