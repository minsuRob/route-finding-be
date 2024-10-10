import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateAccountInput } from './dtos/create-account.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly users: Repository<User>,
  ) {}

  async createAccount({
    email,
    password,
    role,
  }: CreateAccountInput): Promise<string | undefined> {
    try {
      const exists = await this.users.findOne({ where: { email: email } });
      console.log('what2!');

      if (exists) {
        return 'There is a user with that email already';
      }

      await this.users.save(this.users.create({ email, password, role }));
    } catch (e) {
      console.log(e);
      return "Couldn't create account";
    }
  }
}
