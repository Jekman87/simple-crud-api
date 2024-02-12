import { v4 as uuidv4 } from 'uuid';
import { User } from '../types/types';

const users: User[] = [{ id: '6ec0bd7f-11c0-43da-975e-2a8ad9ebae0b', username: 'Sdfsd', age: 33, hobbies: ['sdf'] }];

export const getUserIndex = (id: string) => users.findIndex((user) => user.id === id);

export const getAllUsers = () => users;

export const getUserById = (id: string) => {
  const index = getUserIndex(id)

  return users[index];
};

export const createNewUser = (userData: User) => {
  const newUser = { ...userData, id: uuidv4() };
  users.push(newUser);

  return newUser;
};

export const updateExistingUser = (userData: User, id: string) => {
  const index = getUserIndex(id);

  const updatedUser = { ...userData, id };
  users[index] = updatedUser;

  return updatedUser;
};
