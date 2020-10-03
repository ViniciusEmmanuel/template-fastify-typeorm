import { FastifyInstance } from 'fastify';

import { RouterSession, RouterSessionVersion } from './session.routes';

import { RouterUsers, RouterUsersVersion } from './user.routes';

export class Router {
  constructor(private App: FastifyInstance) {
    this.register();
  }

  private prefix(routeVersion: string) {
    return `/api${routeVersion}`;
  }

  private register(): void {
    this.App.register(RouterUsers, {
      prefix: this.prefix(RouterUsersVersion),
    });

    this.App.register(RouterSession, {
      prefix: this.prefix(RouterSessionVersion),
    });
  }
}
