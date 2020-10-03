const {
  name = '',
  version = '',
  description = '',
} = require('../../../package.json');

import { SwaggerOptions } from 'fastify-swagger';

export const OptionsSwagger: SwaggerOptions = {
  routePrefix: '/docs',
  swagger: {
    info: {
      title: name,
      description: description,
      version: version,
    },
    externalDocs: {
      url: 'https://swagger.io',
      description: 'Docs Swagger',
    },
    host: 'localhost',
    schemes: ['http'],
    consumes: ['application/json'],
    produces: ['application/json'],
  },
  exposeRoute: true,
};
