import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { REPOSITORIES } from '../global/repositories/repositories.enum';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { ReservationDto } from './dto/reservation.dot';
import { UpdateBookDto } from './dto/update-book.dto';
import { IBookRepository } from './models/book.repository';

describe('BookService', () => {
  let service: BookService;
  let bookRepository: IBookRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BookService,
        {
          provide: REPOSITORIES.BOOK,
          useValue: {
            create: jest.fn(),
            findById: jest.fn(),
            findAll: jest.fn(),
            updateById: jest.fn(),
            deleteById: jest.fn(),
            reservation: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<BookService>(BookService);
    bookRepository = module.get<IBookRepository>(REPOSITORIES.BOOK);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new book', async () => {
      const date = new Date();

      const createBookDto: CreateBookDto = {
        authorId: '1',
        genderId: '1',
        title: 'test',
        quantity: 1,
        publishedDate: date,
      };
      const result = {
        id: '1',
        createdAt: date,
        updatedAt: date,
        title: 'ABC da programação',
        publishedDate: date,
        quantity: 5,
        author: {
          id: '1',
          createdAt: date,
          updatedAt: date,
          name: 'Gabriela',
          books: [],
        },
        gender: {
          id: '1',
          createdAt: date,
          updatedAt: date,
          description: 'Programação',
          books: [],
        },
        reservations: [],
      };

      jest.spyOn(bookRepository, 'create').mockResolvedValue(result);

      expect(await service.create(createBookDto)).toEqual(result);
      expect(bookRepository.create).toHaveBeenCalledWith(createBookDto);
    });
  });

  describe('findById', () => {
    it('should return a book if found', async () => {
      const date = new Date();

      const book = {
        id: '1',
        createdAt: date,
        updatedAt: date,
        title: 'ABC da programação',
        publishedDate: date,
        quantity: 5,
        author: {
          id: '1',
          createdAt: date,
          updatedAt: date,
          name: 'Gabriela',
          books: [],
        },
        gender: {
          id: '1',
          createdAt: date,
          updatedAt: date,
          description: 'Programação',
          books: [],
        },
        reservations: [],
      };
      jest.spyOn(bookRepository, 'findById').mockResolvedValue(book);

      expect(await service.findById('1')).toEqual(book);
      expect(bookRepository.findById).toHaveBeenCalledWith('1');
    });

    it('should throw an error if book not found', async () => {
      jest.spyOn(bookRepository, 'findById').mockResolvedValue(null);

      await expect(service.findById('1')).rejects.toThrow(BadRequestException);
    });
  });

  describe('update', () => {
    it('should update a book', async () => {
      const date = new Date();

      const updateBookDto: UpdateBookDto = {
        title: 'ABC da programação',
      };

      const book = {
        id: '1',
        createdAt: date,
        updatedAt: date,
        title: 'ABC da programação',
        publishedDate: date,
        quantity: 5,
        author: {
          id: '1',
          createdAt: date,
          updatedAt: date,
          name: 'Gabriela',
          books: [],
        },
        gender: {
          id: '1',
          createdAt: date,
          updatedAt: date,
          description: 'Programação',
          books: [],
        },
        reservations: [],
      };

      jest.spyOn(service, 'findById').mockResolvedValue(book);
      jest
        .spyOn(bookRepository, 'updateById')
        .mockResolvedValue({ ...book, ...updateBookDto });

      expect(await service.update('1', updateBookDto)).toEqual({
        ...updateBookDto,
        ...book,
      });
      expect(bookRepository.updateById).toHaveBeenCalledWith(
        '1',
        updateBookDto,
      );
    });
  });

  describe('delete', () => {
    it('should delete a book', async () => {
      const date = new Date();

      const book = {
        id: '1',
        createdAt: date,
        updatedAt: date,
        title: 'ABC da programação',
        publishedDate: date,
        quantity: 5,
        author: {
          id: '1',
          createdAt: date,
          updatedAt: date,
          name: 'Gabriela',
          books: [],
        },
        gender: {
          id: '1',
          createdAt: date,
          updatedAt: date,
          description: 'Programação',
          books: [],
        },
        reservations: [],
      };

      jest.spyOn(service, 'findById').mockResolvedValue(book);
      jest.spyOn(bookRepository, 'deleteById').mockResolvedValue(undefined);

      expect(await service.delete('1')).toBeUndefined();
      expect(bookRepository.deleteById).toHaveBeenCalledWith('1');
    });
  });

  describe('reservation', () => {
    it('should reserve a book', async () => {
      const reservationDto: ReservationDto = {
        bookId: '1',
        cpf: '94395602070',
      };
      const date = new Date();

      const book = {
        id: '1',
        createdAt: date,
        updatedAt: date,
        title: 'ABC da programação',
        publishedDate: date,
        quantity: 5,
        author: {
          id: '1',
          createdAt: date,
          updatedAt: date,
          name: 'Gabriela',
          books: [],
        },
        gender: {
          id: '1',
          createdAt: date,
          updatedAt: date,
          description: 'Programação',
          books: [],
        },
        reservations: [],
      };

      const result = {
        bookId: '1',
        cpf: '94395602070',
        id: '1',
        createdAt: date,
        updatedAt: date,
      };

      jest.spyOn(service, 'findById').mockResolvedValue(book);
      jest.spyOn(bookRepository, 'reservation').mockResolvedValue(result);

      expect(await service.reservation(reservationDto)).toEqual(result);
      expect(service.findById).toHaveBeenCalledWith('1');
      expect(bookRepository.reservation).toHaveBeenCalledWith(
        reservationDto,
        book,
      );
    });
  });
});
