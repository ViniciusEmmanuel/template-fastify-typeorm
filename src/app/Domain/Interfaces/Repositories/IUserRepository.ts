import { Repository } from 'typeorm';
import { User } from '@domain/Models/User';

export interface IUserRepository extends Repository<User> {}
