'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { IS_LOGIN_KEY } from '@/constants/temporary';
import { getUsers, TUserResponse } from '@/services/user';
import { Toast } from '@/components/common';
import { TError } from '@/types';

const HomePage = (): React.ReactNode => {
  const { replace } = useRouter();
  const [users, setUsers] = useState<TUserResponse[]>([]);
  const [error, setError] = useState('');
  const [showError, setShowError] = useState(false);

  const getAllUsers = async (): Promise<void> => {
    try {
      const data = await getUsers();
      setUsers(data);
    } catch (error) {
      setError((error as TError).message);
      setShowError(true);
    }
  };
  useEffect(() => {
    const isLogin = sessionStorage.getItem(IS_LOGIN_KEY);
    if (!isLogin) {
      replace('/auth/login');
      return;
    }
    getAllUsers();
  }, []);
  return (
    <div className="p-mobile md:p-desktop max-w-screen-xl mx-auto grid grid-cols-[repeat(auto-fit,_minmax(240px,_1fr))] gap-6">
      {users.map(user => (
        <div className="p-4 grow basis-52 flex flex-col gap-6 rounded-lg shadow-lg shadow-black/10 bg-primary-light">
          <div className="flex flex-col">
            <b className="font-semibold text-primary-dark text-xl block truncate">{user.name}</b>
            <span className="font-medium text-sm text-desc">{user.email}</span>
          </div>
          <p className="text-sm text-text">
            {user.address.street}, {user.address.suite}, {user.address.city} ({user.address.zipcode})
          </p>
        </div>
      ))}
      <Toast show={showError} type="error" onClose={() => setShowError(false)}>
        <p className="text-sm font-medium text-left translate-y-px">{error}</p>
      </Toast>
    </div>
  );
};

export default HomePage;
