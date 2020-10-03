import { IRequest, IResponse } from '@interfaces/IController';

import { AuthenticateToken } from '@provider/AuthenticateToken';

export async function authenticated(
  request: IRequest,
  response: IResponse,
): Promise<unknown | void> {
  const [type, token] = request.headers['authorization']?.split(' ') ?? [
    null,
    null,
  ];

  if (type !== 'Bearer') {
    return response.status(401).send();
  }

  if (!token) {
    return response.status(401).send();
  }

  try {
    const { id } = new AuthenticateToken().verify({ token });

    request.user = {
      id,
    };
  } catch {
    return response.status(401).send();
  }
}
