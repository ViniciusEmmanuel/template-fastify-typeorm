import 'dotenv/config';
import 'reflect-metadata';

import fastify, { FastifyInstance } from 'fastify';
import fastifyFormBody from 'fastify-formbody';
import fastifySwagger from 'fastify-swagger';
import cors from 'fastify-cors';

import { Router } from '@routes/index';
import { CorsOptions } from '@config/Cors';
import { ServerOptions } from '@config/ServerOption';
import { ExceptionHandler } from '@exception/ExceptionHandler';
import { OptionsSwagger } from '@config/Swagger';
import ConnectionDB from '@database/ConnectionDB';
import Logger from '@provider/Logger';

export default class Server {
  private app: FastifyInstance;

  private readonly signals: NodeJS.Signals[] = ['SIGINT', 'SIGTERM', 'SIGQUIT'];
  private readonly port = Number(process.env.PORT) || 3333;
  private readonly host = process.env.HOST || '0.0.0.0';

  constructor() {
    this.app = fastify(ServerOptions);
  }

  private async configureServer() {
    await ConnectionDB.start();

    this.app.register(fastifyFormBody);
    this.app.register(cors, CorsOptions);
    this.app.register(fastifySwagger, OptionsSwagger);
    new ExceptionHandler(this.app);
    new Router(this.app);

    await require('@singleton/index');

    this.app.ready(err => {
      if (err) throw err;
      this.app.swagger();
    });
  }

  public async init() {
    try {
      await this.configureServer();
    } catch (error) {
      Logger.error(error, 'Error ao configurar do server.');

      process.exit(1);
    }
  }

  public start() {
    try {
      this.app.listen(this.port, this.host);

      Logger.info(
        {},
        `🚀 Server iniciado no Host::${this.host} e Port::${this.port}`,
      );

      for (const signal of this.signals) {
        process.on(signal, async () => {
          await this.close();
        });
      }
    } catch (error) {
      Logger.error(error, 'Error no start do server.');

      process.exit(1);
    }
  }

  private async close() {
    try {
      await ConnectionDB.close();

      Logger.info({}, 'Server desligado');

      process.exit(0);
    } catch (error) {
      Logger.error(error, 'Erro ao desligar o servidor');

      process.exit(1);
    }
  }
}
