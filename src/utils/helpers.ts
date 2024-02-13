import { validate, version } from 'uuid';
import { User } from '../types/types';

export const validateId = (uuid: string): boolean => validate(uuid) && version(uuid) === 4;

export const validateUserInput = (userData: User): boolean => {
  const { username, age, hobbies } = userData;

  return !!(
    username &&
    typeof username === 'string' &&
    age &&
    typeof age === 'number' &&
    Array.isArray(hobbies) &&
    hobbies.every((v) => typeof v === 'string')
  );
};
