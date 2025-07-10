import { clickById } from '@/utils/general';

/**
 * Props for the Modal component.
 *
 * @property id - A unique identifier for the modal, used for controlling visibility.
 * @property preventClose - Prevents the modal from being closed via background click or close button.
 * @property maxWidth - (Optional) Maximum width of the modal container.
 * @property wrapperClass - Optional className for the outer modal wrapper.
 * @property hideClose - If true, hides the default close (✕) button.
 * @property children - Content to be displayed inside the modal.
 * @property shown - Callback function triggered when the modal is shown.
 * @property hidden - Callback function triggered when the modal is hidden.
 * @property className - Additional className for the modal content container.
 */
type TModal = {
  id: string;
  preventClose?: boolean;
  maxWidth?: number;
  wrapperClass?: string;
  hideClose?: boolean;
  children: React.ReactNode;
  shown?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  hidden?: (event: React.ChangeEvent<HTMLInputElement>) => void;
} & React.ComponentPropsWithoutRef<'div'>;

/**
 * `Modal` is a lightweight modal component that uses a hidden checkbox toggle
 * combined with `peer` and `:checked` selectors in TailwindCSS.
 *
 * This design avoids React state for controlling visibility, making it suitable
 * for simple modal use cases with CSS-based transitions and accessibility.
 *
 * The modal includes an optional close button and supports custom open/close callbacks.
 *
 * @param props - Modal configuration and rendering options.
 * @returns A modal component rendered on top of a backdrop, optionally with close functionality.
 */
const Modal = ({ className, ...props }: TModal): React.ReactNode => {
  return (
    <div
      className={`fixed inset-0 grid place-items-center pointer-events-none z-50 px-3 xs:px-mobile md:px-desktop ${ props.wrapperClass ||
        '' }`}
    >
      {/* Overlay + hidden checkbox for toggling modal */}
      <label
        aria-label="modal"
        className="peer absolute inset-0 z-50 bg-gray-5/30 opacity-0 pointer-events-none transition-opacity duration-300 delay-200
          has-[:checked]:opacity-100 has-[:checked]:delay-0 has-[:checked]:pointer-events-auto"
        htmlFor={props.id}
      >
        <input
          className="hidden"
          disabled={props.preventClose}
          id={props.id}
          name="modal"
          type="checkbox"
          onChange={e => (e.target.checked ? props.shown && props.shown(e) : props.hidden && props.hidden(e))}
        />
      </label>

      {/* Modal content */}
      <div
        className={`opacity-0 pointer-events-none transition-opacity duration-300 z-50 w-full [&_*]:pointer-events-none
          peer-has-[:checked]:opacity-100 peer-has-[:checked]:pointer-events-auto peer-has-[:checked]:delay-200
          peer-has-[:checked]:[&_*]:pointer-events-auto relative bg-white rounded-3xl ${className}`}
        style={props.maxWidth ? { maxWidth: props.maxWidth } : undefined}
      >
        {!props.hideClose && (
          <button
            className="w-7 h-7 text-sm rounded-md grid place-items-center text-grey-label border border-grey-label absolute top-5 right-5
              hover:border-komship-dark hover:text-komship-dark active:border-komship-darker active:text-komship-darker"
            onClick={() => clickById(props.id)}
          >
            ✕
          </button>
        )}
        {props.children}
      </div>
    </div>
  );
};

export default Modal;
