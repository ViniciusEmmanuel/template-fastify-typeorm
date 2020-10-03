import { FastifyInstance } from 'fastify';
import { IncomingMessage, Server, ServerResponse } from 'http';

import { UserController } from '@controller/UserController';

const RouterUsers = (
  app: FastifyInstance<Server, IncomingMessage, ServerResponse>,
  opts: { prefix: string },
  next: (err?: Error) => void,
) => {
  app.post(
    '/users',
    {
      schema: {
        body: {
          name: { type: 'string' },
          email: { type: 'string' },
          password: { type: 'string' },
        },
      },
    },
    new UserController().store,
  );

  next();
};

const RouterUsersVersion = '/v1';

export { RouterUsers, RouterUsersVersion };
