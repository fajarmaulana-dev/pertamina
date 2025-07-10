import type { TChildren } from '@/types';

const MainLayout = ({ children }: TChildren): React.ReactNode => {
  return (
    <>
      <main>{children}</main>
    </>
  );
};

export default MainLayout;
