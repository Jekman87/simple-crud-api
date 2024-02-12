import { v4 as uuidv4 } from 'uuid';
import { User } from '../types/types';

const users: User[] = [];

export const getUserIndex = (id: string) => users.findIndex((user) => user.id === id);

export const getAllUsers = () => users;

export const getUserById = (id: string) => {
  const index = getUserIndex(id);

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

export const deleteExistingUser = (id: string) => {
  const index = getUserIndex(id);

  users.splice(index, 1);

  return true;
};
