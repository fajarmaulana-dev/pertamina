import { ComponentPropsWithoutRef } from 'react';

export type TPicnicIcon = {
  color?: string;
  size?: number;
  thick?: number;
} & ComponentPropsWithoutRef<'svg'>;

const PicnicIcon = ({ color = '#088BC7', size = 24, thick = 4.5, ...props }: TPicnicIcon): React.ReactNode => {
  return (
    <svg fill="none" height={size} viewBox="0 0 48 48" width={size} xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M24 28C26.2091 28 28 26.2091 28 24C28 21.7909 26.2091 20 24 20C21.7909 20 20 21.7909 20 24C20 26.2091 21.7909 28 24 28ZM24 28L18 44M24 28L30 44M24 4V12M13.6 30L6.6 34M41.4 14L34.4 18M13.6 18L6.6 14M41.4 34L34.4 30M16 44H32M36 37.4C38.7172 34.9697 40.6324 31.7717 41.4922 28.2291C42.352 24.6865 42.1159 20.9663 40.8151 17.5608C39.5143 14.1553 37.2102 11.2251 34.2076 9.15776C31.205 7.09047 27.6455 5.98359 24 5.98359C20.3546 5.98359 16.795 7.09047 13.7924 9.15776C10.7898 11.2251 8.48568 14.1553 7.1849 17.5608C5.88412 20.9663 5.64802 24.6865 6.50783 28.2291C7.36765 31.7717 9.28285 34.9697 12 37.4"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={thick}
      />
    </svg>
  );
};

export default PicnicIcon;
