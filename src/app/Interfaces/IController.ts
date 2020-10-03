import { FastifyReply, FastifyRequest } from 'fastify';

export interface IRequest extends FastifyRequest {}

export interface IResponse extends FastifyReply {}
