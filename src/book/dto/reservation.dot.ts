import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class ReservationDto {
  @IsString()
  @IsNotEmpty()
  cpf: string;

  @IsUUID()
  @IsNotEmpty()
  bookId: string;
}
