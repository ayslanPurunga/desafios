import jwt from 'jsonwebtoken';
import { IUserDTO } from '../dtos/IUserDTO';
import { IUserCreatedDTO } from '../dtos/IUserCreatedDTO';

const { JWT_SECRET } = process.env;

const encode = (payload: (IUserDTO | IUserCreatedDTO)) => {
  if (JWT_SECRET) return jwt.sign({ ...payload }, JWT_SECRET);
} 

const decode = (token: string) => {
  try {
    if (JWT_SECRET)   return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    throw new Error('Token invalido');
  }
}

export default {
  encode,
  decode
}