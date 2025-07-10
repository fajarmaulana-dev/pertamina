import { PicnicIcon } from '@/assets/icons';
import { TChildren } from '@/types';

type TAuthLayout = {
  headContent: React.ReactNode;
} & TChildren;

const AuthLayout = ({ headContent, children }: TAuthLayout): React.ReactNode => {
  return (
    <div className="bg-primary-light">
      <div className="min-h-screen relative max-w-screen-md mx-auto">
        <PicnicIcon className="opacity-10 rotate-[135deg] absolute -left-2 -top-20" size={160} thick={3} />
        <PicnicIcon className="opacity-10 -rotate-45 absolute -right-4 -top-6" size={160} thick={3} />
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <PicnicIcon size={48} />
            <div className="font-raleway flex flex-col items-end text-title">
              <span className="font-extrabold text-xl translate-y-0.5">PICNIC</span>
              <span className="font-medium text-xs -translate-y-0.5">By Kappa</span>
            </div>
          </div>
          {headContent}
        </div>
        <div
          className="relative rounded-t-[32px] bg-white overflow-hidden h-[calc(100vh-80px)] p-8 pb-0 shadow-[0_-2px_10px_0]
            shadow-primary-main/10"
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
