import { getRepository } from 'typeorm';
import { IRequest, IResponse } from '@interfaces/IController';
import { CreateUserService } from '@domain/Services/User/CreateUserService';
import { AuthenticateToken } from '@provider/AuthenticateToken';
import { User } from '@domain/Models/User';

interface IUser {
  name: string;
  email: string;
  password: string;
}

export class UserController {
  public async store(request: IRequest, response: IResponse) {
    const { name, email, password } = request.body as IUser;

    const userRepository = getRepository(User);
    const createUserService = new CreateUserService(userRepository);

    const user = await createUserService.execute({
      name,
      email,
      password,
    });

    const token = new AuthenticateToken().sing({
      payload: { id: user.id },
      id: user.id,
    });

    return response.status(201).send({ token, ...user });
  }
}
