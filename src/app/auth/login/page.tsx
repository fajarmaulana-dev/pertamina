import AuthLayout from '@/components/layout/AuthLayout';
import { LoginForm } from '@/features/auth/components';

const Login = (): React.ReactNode => {
  return (
    <AuthLayout
      headContent={
        <div className="flex flex-col items-end">
          <span className="text-title text-sm font-medium leading-4">Belum punya akun?</span>
          <button className="text-primary-main text-lg font-semibold hover:text-primary-dark leading-6 transition-colors duration-300">
            Daftar
          </button>
        </div>
      }
    >
      <LoginForm />
    </AuthLayout>
  );
};

export default Login;
