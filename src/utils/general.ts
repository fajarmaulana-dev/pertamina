/**
 * Get a DOM element by its ID.
 *
 * @param id - The ID of the element to get.
 * @returns {HTMLElement|null} - The DOM element if found, otherwise null.
 */
export const getById = (id: string): HTMLElement | null => document.getElementById(id);

/**
 * Trigger a click event on an element by its ID.
 *
 * @param id - The ID of the element to click.
 */
export const clickById = (id: string): void => {
  const el = getById(id);
  if (el) {
    el.click();
  }
};

/**
 * Focus an element by its ID.
 *
 * @param id - The ID of the element to focus.
 */
export const focusById = (id: string): void => {
  const el = getById(id);
  if (el) {
    el.focus();
  }
};

/**
 * Smoothly scrolls the window to an element's position, accounting for a fixed header.
 *
 * @param id - The ID of the target element to scroll to.
 */
export const toSection = (id: string): void => {
  const header = getById('main-header');
  const headerHeight = header ? header.offsetHeight : 0;
  const element = getById(id);
  if (!element) return;
  const elementPosition = element.getBoundingClientRect().top;
  const offsetPosition = elementPosition + window.scrollY - headerHeight;

  window.scrollTo({
    top: offsetPosition,
    behavior: 'smooth',
  });
};

/**
 * Get slider position from an event, supports mobile touch events.
 *
 * @param e - The event object of MouseEvent or TouchEvent.
 * @param mobile - Whether the event is from a mobile touch (default: false).
 * @param axis - The axis to get position from, either 'X' or 'Y' (default: 'X').
 * @returns The page X or Y coordinate from the event.
 */
export const slider = (e: React.MouseEvent | React.TouchEvent, mobile = false, axis: 'X' | 'Y' = 'X'): number => {
  return mobile
    ? (e as React.TouchEvent).changedTouches[0][`page${axis}` as 'pageX' | 'pageY']
    : (e as React.MouseEvent)[`page${axis}` as 'pageX' | 'pageY'];
};
