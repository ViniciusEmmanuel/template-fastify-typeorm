import { Hash } from '@provider/Hash';
import { AuthenticateToken } from '@provider/AuthenticateToken';
import { AppError } from '@error/AppErros';
import { IUserRepository } from '@domain/Interfaces/Repositories/IUserRepository';

interface CreateAuthenticate {
  email: string;
  password: string;
}

interface IReturn {
  id: string;
  token: string;
}

export class AuthenticateService {
  constructor(private userRepository: IUserRepository) {}

  public async execute({
    email,
    password,
  }: CreateAuthenticate): Promise<IReturn> {
    const user = await this.userRepository.findOne({
      where: { email },
    });

    if (!user) {
      throw new AppError('Incorrect email or password.', 401);
    }

    if (!(await new Hash().compare(password, user.password))) {
      throw new AppError('Incorrect email or password.', 401);
    }

    const token = new AuthenticateToken().sing({
      payload: { id: user.id },
      id: user.id,
    });

    return { id: user.id, token };
  }
}
