'use server';

import { TError } from '@/types';
import { mainApi } from '@/utils/instance';

export type TUserResponse = {
  name: string;
  email: string;
  address: {
    street: 'Kulas Light';
    suite: 'Apt. 556';
    city: 'Gwenborough';
    zipcode: '92998-3874';
  };
};

export const getUsers = async (): Promise<TUserResponse[]> => {
  try {
    const res = await mainApi.get<TUserResponse[]>('/users');
    return res;
  } catch (error) {
    throw new Error((error as TError).message);
  }
};
