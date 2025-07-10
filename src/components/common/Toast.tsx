'use client';

import { CircleAlert, CircleCheck, Info, TriangleAlert } from 'lucide-react';
import { useEffect, useMemo, useRef } from 'react';
import { TChildren } from '@/types';

type TToast = {
  type?: 'error' | 'success' | 'info' | 'warning';
  show: boolean;
  onClose: () => void;
} & TChildren;

const Toast = ({ type = 'info', show, children, onClose }: TToast): React.ReactNode => {
  const timeoutId = useRef<ReturnType<typeof setTimeout> | null>(null);
  const overflowId = useRef<ReturnType<typeof setTimeout> | null>(null);
  const closeToast = (): void => {
    onClose();
    clearTimeout(timeoutId.current!);
    clearTimeout(overflowId.current!);
    setTimeout(() => {
      document.body.style.overflow = 'auto';
    }, 200);
  };

  const STYLE_BY_TYPE = useMemo(() => {
    switch (type) {
      case 'error':
        return 'bg-error-light border-error-dark text-error-dark';
      case 'info':
        return 'bg-primary-light border-primary-dark text-primary-dark';
      case 'success':
        return 'bg-success-light border-success-dark text-success-dark';
      case 'warning':
        return 'bg-warning-light border-warning-dark text-warning-dark';
      default:
        return '';
    }
  }, [type]);

  const ICON_BY_TYPE = useMemo(() => {
    switch (type) {
      case 'error':
        return <CircleAlert />;
      case 'info':
        return <Info />;
      case 'success':
        return <CircleCheck />;
      case 'warning':
        return <TriangleAlert />;
      default:
        return <></>;
    }
  }, [type]);

  useEffect(() => {
    if (show) {
      document.body.style.overflow = 'hidden';
      timeoutId.current = setTimeout(() => {
        onClose();
      }, 2500);
      overflowId.current = setTimeout(() => {
        document.body.style.overflow = 'auto';
      }, 2700);
    }
  }, [show]);
  return (
    <button
      aria-label="toast"
      className={`bg-black/20 fixed inset-0 z-50 transition-opacity duration-300
        ${show ? 'opacity-100 pointer-events-auto delay-0' : 'opacity-0 pointer-events-none delay-200'}`}
      type="button"
      onClick={closeToast}
    >
      <div
        className={`absolute border right-0 bottom-6 max-w-80 p-3 flex gap-2 rounded-lg transition-transform duration-300 ${STYLE_BY_TYPE}
          ${show ? '-translate-x-6 delay-200' : 'translate-x-full'}`}
      >
        {ICON_BY_TYPE}
        <div>{children}</div>
      </div>
    </button>
  );
};

export default Toast;
