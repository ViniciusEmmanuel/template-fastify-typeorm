import { User } from '@domain/Models/User';
import { Hash } from '@provider/Hash';
import { AppError } from '@error/AppErros';
import { IUserRepository } from '@domain/Interfaces/Repositories/IUserRepository';

interface CreateUser {
  name: string;
  email: string;
  password: string;
}

export class CreateUserService {
  constructor(private userRepository: IUserRepository) {}

  public async execute({ name, email, password }: CreateUser): Promise<User> {
    const checkExistEmail = await this.userRepository.findOne({
      where: { email },
    });

    if (checkExistEmail) throw new AppError('Email address already used.');

    const hashedPassword = await new Hash().hash(password);

    const user = this.userRepository.create({
      name,
      email,
      password: hashedPassword,
    });
    await this.userRepository.save(user);

    return user;
  }
}
