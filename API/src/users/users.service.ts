import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userDataRepository: Repository<User>,
  ) {}

  // Encontra um usuário pelo nome
  async findOne(email: string): Promise<User> {
    return this.userDataRepository.findOne({where: {email: email}});
  }
  
}
