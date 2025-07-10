'use client';
import { Eye, EyeClosed } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { login } from '../actions/login';
import { AuthInput, Toast } from '@/components/common';
import { IS_LOGIN_KEY, REGISTERED_USER, REGISTERED_USER_KEY } from '@/constants/temporary';
import { TError } from '@/types';

const LoginForm = (): React.ReactNode => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const username = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const [error, setError] = useState('');
  const [showError, setShowError] = useState(false);

  const { replace } = useRouter();

  const handleSubmit = async (): Promise<void> => {
    setTimeout(() => {
      setIsLoading(true);
    }, 0);
  };

  const loginUser = async (formData: FormData): Promise<void> => {
    if (!username.current?.value || !password.current?.value) return;
    try {
      await login(formData);
      replace('/');
    } catch (error) {
      setError((error as TError).message);
      setShowError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const existingUser = localStorage.getItem(REGISTERED_USER_KEY);
    const isLogin = sessionStorage.getItem(IS_LOGIN_KEY);
    if (isLogin) {
      replace('/');
      return;
    }
    if (!existingUser) {
      localStorage.setItem(REGISTERED_USER_KEY, JSON.stringify(REGISTERED_USER));
    }
  }, []);
  return (
    <form action={loginUser} className="flex flex-col gap-4">
      <AuthInput ref={username} id="username" name="username" placeholder="Masukkan username" />
      <AuthInput
        ref={password}
        id="password"
        name="password"
        placeholder="Masukkan password ..."
        suffix={showPassword ? <EyeClosed /> : <Eye />}
        type={showPassword ? 'text' : 'password'}
        onSufffixClick={() => setShowPassword(!showPassword)}
      />
      <div className="absolute h-[72px] rounded-2xl shadow-[0_-2px_8px_0] shadow-black/10 inset-x-0 bottom-0 px-4 flex items-center">
        <button
          className="h-11 w-full grid place-items-center font-extrabold text-white text-sm rounded-full bg-primary-main hover:bg-primary-dark
            transition-colors duration-300 disabled:opacity-30"
          disabled={isLoading}
          onClick={handleSubmit}
        >
          Masuk
        </button>
      </div>
      <Toast show={showError} type="error" onClose={() => setShowError(false)}>
        <p className="text-sm font-medium text-left translate-y-px">{error}</p>
      </Toast>
    </form>
  );
};

export default LoginForm;
