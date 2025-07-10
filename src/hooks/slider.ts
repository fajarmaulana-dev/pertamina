/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { Dispatch, SetStateAction, useEffect, useMemo, useRef, useState } from 'react';
import { slider } from '@/utils/general';

type TMobSlide = { mobile: boolean };
type TUseSliderResult = {
  screen: number;
  currentSlide: number;
  movement: number;
  grab: boolean;
  disableLeftArrow: boolean;
  disableRightArrow: boolean;
  setCurrentSlide: Dispatch<SetStateAction<number>>;
  startSlide: (e: React.MouseEvent | React.TouchEvent, param?: TMobSlide) => void;
  moveSlide: (e: React.MouseEvent | React.TouchEvent, param?: TMobSlide) => void;
  endSlide: (e: React.MouseEvent | React.TouchEvent, param?: TMobSlide) => void;
  next: () => void;
  back: () => void;
};

/**
 * useSlider is a custom hook to manage the logic for the slider component.
 *
 * @param data - An array of data to display in the slider.
 * @param mobileOnly - Boolean indicating whether the slider is showed on mobile only or not.
 * @param infiniteSlide - Boolean indicating whether the slider can be slided infinitely or not.
 * @param loading - Boolean indicating whether the data is still loading.
 * @returns An object containing state values and handlers for slider control and interaction.
 */
export const useSlider = (
  data: any[],
  mobileOnly = false,
  infiniteSlide = false,
  loading = false,
): TUseSliderResult => {
  const [screen, setScreen] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [movement, setMovement] = useState(0);
  const [grab, setGrab] = useState(false);
  const xStartRef = useRef(0);
  const xEndRef = useRef(0);
  const throttleRef = useRef(false);

  /**
   * Determines whether the left navigation arrow should be disabled.
   */
  const disableLeftArrow = useMemo(() => {
    return currentSlide === 0 || data.length === 0 || loading;
  }, [currentSlide, data, loading]);

  /**
   * Determines whether the right navigation arrow should be disabled.
   */
  const disableRightArrow = useMemo(() => {
    return currentSlide === data.length - 1 || data.length === 0 || loading;
  }, [currentSlide, data, loading]);

  /**
   * Initializes the current screen width.
   */
  const initNeeds = (): void => setScreen(window.innerWidth);

  /**
   * Begins drag or swipe interaction for the slider.
   *
   * @param e - Mouse or touch event.
   * @param param - Optional parameter to indicate a mobile event. Defaults to `true`.
   */
  const startSlide = (e: React.MouseEvent | React.TouchEvent, param: TMobSlide = { mobile: false }): void => {
    if (mobileOnly && screen >= 840) return;
    xStartRef.current = slider(e, param.mobile);
    setGrab(true);
  };

  /**
   * Handles the ongoing drag/swipe movement of the slider.
   *
   * @param e - Mouse or touch event.
   * @param param - Optional parameter to indicate a mobile event.
   */
  const moveSlide = (e: React.MouseEvent | React.TouchEvent, param: TMobSlide = { mobile: false }): void => {
    if (mobileOnly && screen >= 840) return;
    const diff = slider(e, param.mobile) - xStartRef.current;
    const move = param.mobile && Math.abs(diff) <= 24 ? 0 : diff;
    const len = data.length - 1;

    if (currentSlide === 0 && move > 0) setCurrentSlide(0);
    if (currentSlide === len && move < 0) setCurrentSlide(len);

    setMovement(move);
  };

  /**
   * Throttle call of next and back function.
   */
  const throttle = (callback: () => void, delay = 100): void => {
    if (throttleRef.current) return;
    throttleRef.current = true;
    callback();
    setTimeout(() => {
      throttleRef.current = false;
    }, delay);
  };

  /**
   * Navigates to the next slide if possible.
   */
  const next = (): void => {
    if (disableRightArrow && !infiniteSlide) return;
    throttle(() => {
      if (disableRightArrow) {
        setCurrentSlide(0);
        return;
      }
      setCurrentSlide(prev => prev + 1);
    });
  };

  /**
   * Navigates to the previous slide if possible.
   */
  const back = (): void => {
    if (disableLeftArrow && !infiniteSlide) return;
    throttle(() => {
      if (disableLeftArrow) {
        setCurrentSlide(data.length - 1);
        return;
      }
      setCurrentSlide(prev => prev - 1);
    });
  };

  /**
   * Ends the drag or swipe interaction and determines if a slide change should occur.
   *
   * @param e - Mouse or touch event.
   * @param param - Optional parameter to indicate a mobile event.
   */
  const endSlide = (e: React.MouseEvent | React.TouchEvent, param: TMobSlide = { mobile: false }): void => {
    if (mobileOnly && screen >= 840) return;
    setGrab(false);
    xEndRef.current = slider(e, param.mobile);
    if (xStartRef.current > xEndRef.current && xStartRef.current - xEndRef.current > 92) next();
    if (xStartRef.current < xEndRef.current && xEndRef.current - xStartRef.current > 92) back();
    setMovement(0);
  };

  // Initialize screen size on mount and listen for resize
  useEffect(() => {
    initNeeds();
    window.addEventListener('resize', initNeeds);
    return (): void => {
      window.removeEventListener('resize', initNeeds);
    };
  }, []);

  return {
    screen,
    currentSlide,
    movement,
    grab,
    disableLeftArrow,
    disableRightArrow,
    setCurrentSlide,
    startSlide,
    moveSlide,
    endSlide,
    next,
    back,
  };
};
