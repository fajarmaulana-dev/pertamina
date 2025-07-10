'use client';

import { ComponentPropsWithRef, useEffect, useRef } from 'react';

/**
 * Props for the LazyBackground component.
 *
 * @property url - The background image URL to be lazy-loaded when the component enters the viewport.
 * @property children - Optional child elements to be rendered inside the background container.
 * @property className - Optional CSS class name(s) for styling the outer div.
 */
type TLazyBackground = {
  url: string;
  children?: React.ReactNode;
} & ComponentPropsWithRef<'div'>;

/**
 * `LazyBackground` is a React component that lazy-loads a `background-image`
 * using the `IntersectionObserver` API. It only sets the background once the
 * component becomes visible in the viewport, which improves performance for large images.
 *
 * This is especially useful for hero sections or banners that are far down the page.
 *
 * @param url - The URL of the background image.
 * @param children - Any children elements to render inside the div.
 * @param className - Additional CSS classes for the container.
 *
 * @returns A `div` element with a lazy-loaded background image.
 */
const LazyBackground = ({ url, children, className }: TLazyBackground): React.ReactNode => {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(([entry], obs) => {
      if (entry.isIntersecting) {
        el.style.backgroundImage = `url(${url})`;
        obs.unobserve(el);
      }
    });

    observer.observe(el);

    return (): void => observer.disconnect();
  }, [url]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
};

export default LazyBackground;
