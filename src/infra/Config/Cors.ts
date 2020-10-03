import { FastifyCorsOptions } from 'fastify-cors';

export const CorsOptions: FastifyCorsOptions = {
  origin: process.env.URL_ENABLE_CORS,

  methods: ['GET', 'PUT', 'OPTIONS', 'PATCH', 'POST', 'DELETE'],

  allowedHeaders: ['Content-Type', 'Authorization'],

  credentials: true,

  maxAge: 90,
};
