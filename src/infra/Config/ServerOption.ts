import { FastifyServerOptions } from 'fastify';

export const ServerOptions: FastifyServerOptions = {
  logger: process.env.NODE_ENV?.toUpperCase() === 'DEVELOPMENT',
};
