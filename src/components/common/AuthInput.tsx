import React, { ComponentPropsWithRef } from 'react';

type TAuthInput = {
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  onPrefixClick?: () => void;
  onSufffixClick?: () => void;
} & ComponentPropsWithRef<'input'>;

const AuthInput = React.forwardRef<HTMLInputElement, TAuthInput>(
  ({ prefix, suffix, onPrefixClick, onSufffixClick, className, id, ...props }, ref) => {
    return (
      <label className={`flex items-center bg-desc/15 text-desc h-12 rounded-2xl ${className}`} htmlFor={id}>
        {prefix && (
          <button
            aria-label="prefix"
            className="h-full px-4 grid place-items-center"
            type="button"
            onClick={onPrefixClick}
          >
            {prefix}
          </button>
        )}
        <input
          ref={ref}
          autoComplete="off"
          className={`h-full bg-transparent text-sm w-full border-none outline-none${prefix ? '' : ' pl-4'}${suffix ? '' : ' pr-4'}`}
          id={id}
          spellCheck="false"
          {...props}
        />
        {suffix && (
          <button
            aria-label="suffix"
            className="h-full px-4 grid place-items-center"
            type="button"
            onClick={onSufffixClick}
          >
            {suffix}
          </button>
        )}
      </label>
    );
  },
);

AuthInput.displayName = 'AuthInput';

export default AuthInput;
