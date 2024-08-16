import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../global/models/base.entity';

@Entity()
export class Reservation extends BaseEntity {
  @Column()
  cpf: string;
}
