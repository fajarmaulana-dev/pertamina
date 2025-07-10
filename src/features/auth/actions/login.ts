import { ERROR, IS_LOGIN_KEY, REGISTERED_USER_KEY } from '@/constants/temporary';

type TUser = {
  username: string;
  password: string;
};

export const login = async (formData: FormData): Promise<void> => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  const existingUser = JSON.parse(localStorage.getItem(REGISTERED_USER_KEY)!) as TUser;
  const user = Object.fromEntries(formData.entries()) as TUser;
  if (user.username !== existingUser.username) {
    throw new Error(ERROR.UNREGISTERED_USER);
  }
  if (user.password !== existingUser.password) {
    throw new Error(ERROR.INVALID_PASSWORD);
  }
  sessionStorage.setItem(IS_LOGIN_KEY, 'true');
};
