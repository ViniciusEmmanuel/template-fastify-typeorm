import { FastifyInstance } from 'fastify';
import { AppError } from '@error/AppErros';
import Logger from '@provider/Logger';

export class ExceptionHandler {
  private app: FastifyInstance;
  constructor(app: FastifyInstance) {
    this.app = app;
    this.init();
  }

  private init(): void {
    this.app.setErrorHandler(function (error, request, response) {
      if (error instanceof AppError) {
        Logger.error(error, 'AppError');

        return response.status(error.statusCode).send({
          status: 'error',
          message: error.message,
        });
      }

      Logger.error(error, 'GenericError');

      if (
        error.name === 'Error' ||
        (error.validation && error.validation.length > 0)
      ) {
        return response.send({
          status: 'error',
          message: error.message,
        });
      }

      return response.status(500).send({
        status: 'error',
        message: 'Internal server error',
      });
    });
  }
}
