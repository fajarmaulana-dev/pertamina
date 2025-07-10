import http from './api';
import { BASE_URL } from '@/constants/env';

export const mainApi = http.create({
  baseURL: BASE_URL,
});
