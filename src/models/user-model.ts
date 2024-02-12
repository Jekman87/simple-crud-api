import { v4 as uuidv4 } from 'uuid';
import { User } from '../types/types';

const users: User[] = [{ id: '6ec0bd7f-11c0-43da-975e-2a8ad9ebae0b', username: 'Sdfsd', age: 33, hobbies: ['sdf'] }];

export const getAllUsers = () => users;

export const getUserById = (id: string) => users.find((user) => user.id === id);

export const createNewUser = (user: User) => {
  const newUser = { ...user, id: uuidv4() };
  users.push(newUser);

  return newUser;
};
