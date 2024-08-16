import { DataSource } from 'typeorm';
import { Author } from './src/book/models/author.entity';
import { Book } from './src/book/models/book.entity';
import { Gender } from './src/book/models/gender.entity';
import { Reservation } from './src/book/models/reservation.entity';

async function runSeed() {
  const dataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5436,
    username: 'postgres',
    password: 'postgres',
    database: 'library',
    entities: [Book, Author, Gender, Reservation],
    synchronize: true,
  });

  await dataSource.initialize();

  const genderRepository = dataSource.getRepository(Gender);
  const authorRepository = dataSource.getRepository(Author);
  const bookRepository = dataSource.getRepository(Book);

  const genders = [
    { description: 'Fiction' },
    { description: 'Non-Fiction' },
    { description: 'Science Fiction' },
  ];

  const authors = [
    { name: 'George Orwell' },
    { name: 'Harper Lee' },
    { name: 'Isaac Asimov' },
  ];

  for (const genderData of genders) {
    const gender = genderRepository.create(genderData);
    await genderRepository.save(gender);
  }

  for (const authorData of authors) {
    const author = authorRepository.create(authorData);
    await authorRepository.save(author);
  }

  const genres = await genderRepository.find();
  const authorsEntities = await authorRepository.find();

  const books = [
    {
      title: '1984',
      author: authorsEntities[0],
      gender: genres[2],
      quantity: 10,
      publishedDate: new Date('1949-06-08'),
    },
    {
      title: 'To Kill a Mockingbird',
      author: authorsEntities[1],
      gender: genres[0],
      quantity: 10,
      publishedDate: new Date('1960-07-11'),
    },
    {
      title: 'Foundation',
      author: authorsEntities[2],
      gender: genres[2],
      quantity: 10,
      publishedDate: new Date('1951-06-01'),
    },
  ];

  for (const bookData of books) {
    const book = bookRepository.create(bookData);
    await bookRepository.save(book);
  }

  console.log('Seeding completed.');
  await dataSource.destroy();
}

runSeed().catch((error) => {
  console.error('Error seeding the database', error);
  process.exit(1);
});
