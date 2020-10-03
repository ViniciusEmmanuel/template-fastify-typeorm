import { getRepository } from 'typeorm';
import { IRequest, IResponse } from '@interfaces/IController';
import { AuthenticateService } from '@domain/Services/User/AuthenticateService';
import { User } from '@domain/Models/User';

interface ISessionStore {
  email: string;
  password: string;
}

export class SessionController {
  public async store(request: IRequest, response: IResponse) {
    const { email, password } = request.body as ISessionStore;

    const userRepository = getRepository(User);

    const authenticateService = new AuthenticateService(userRepository);

    const { id, token } = await authenticateService.execute({
      email,
      password,
    });

    return response.status(201).send({ id, token });
  }
}
