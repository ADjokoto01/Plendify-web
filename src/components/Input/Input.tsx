import React from 'react';

import { ErrorText } from '@/components';
import { cn, Icon } from '@/lib';
import { InputLabel } from '../InputLabel';

type Props = Readonly<{
  [other: string]: any;

  error?: string | boolean;
  className?: string;
  label?: string;
  type?: React.InputHTMLAttributes<HTMLInputElement>['type'] | 'textarea';
  name?: string;
  id?: string;

  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  iconBefore?: React.ReactNode;

  innerClassName?: string;
  inputClassName?: string;
}> &
  React.HTMLAttributes<HTMLInputElement> &
  React.HTMLAttributes<HTMLTextAreaElement>;

export const Input = React.forwardRef(
  (props: Props, ref: React.Ref<HTMLInputElement & HTMLTextAreaElement>) => {
    const {
      label,
      type = 'text',
      error = '',
      className,
      inputClassName,
      innerClassName,
      prefix,
      suffix,
      id,
      ...otherProps
    } = props;

    delete otherProps.defaultValue;

    const wrapperRef = React.useRef<HTMLDivElement | null>(null);
    const isTextarea = type === 'textarea';
    const isPassword = type === 'password';

    const [show, setShow] = React.useState(false);

    const computedTestId = `input-${label}`;

    const computedType = React.useMemo(() => {
      switch (type) {
        case 'password':
          return show ? 'text' : 'password';
        case 'date':
          return 'date';
        default:
          return type;
      }
    }, [type, show]);

    const computedInputClassName = cn(
      'w-full border-none min-w-[0px] !outline-0 !bg-[transparent] self-stretch outline-none text-neutral-grey-600',
      'placeholder:text-grey-600 disabled:cursor-not-allowed',
      'focus:outline-none focus:ring-0 -webkit-tap-highlight-color-transparent',
      inputClassName,
    );

    function focusOnInput() {
      const input = wrapperRef.current?.querySelector('input');
      if (!input) return;
      input.focus();
    }

    function handleWrapperClick(e: React.MouseEvent<HTMLDivElement>) {
      e.stopPropagation();
      focusOnInput();
    }

    function handleLabelClick(e: React.MouseEvent<HTMLLabelElement>) {
      e.stopPropagation();
      focusOnInput();
    }

    function handleToggleShow() {
      setShow((prev) => !prev);
      focusOnInput();
    }

    return (
      /* WRAPPER */
      <div
        ref={wrapperRef}
        className={cn('', className)}
        onClick={handleWrapperClick}
      >
        {/* LABEL */}
        {label ? (
          <InputLabel
            htmlFor={props?.id ?? props.name}
            onClick={handleLabelClick}
          >
            {label}
          </InputLabel>
        ) : null}

        {/* INNER */}
        <div
          className={cn(
            'flex items-center border border-neutral-grey-200 p-2 px-4 ',
            'focus-within:border-b-2',
            { 'border-b-semantics-red': !!error },
            { 'h-12': !isTextarea },
            { 'bg-[#F3F3F4]': otherProps.disabled },
            innerClassName,
          )}
        >
          {prefix}

          {props.iconBefore && (
            <InputPrefixIconWrapper>{props.iconBefore}</InputPrefixIconWrapper>
          )}

          {/* TEXT FIELD */}
          {!isTextarea ? (
            <input
              data-testid={computedTestId}
              type={computedType}
              ref={ref}
              className={computedInputClassName}
              id={id ?? otherProps.name}
              {...otherProps}
            />
          ) : null}

          {/* TEXTAREA */}
          {isTextarea ? (
            <textarea
              data-testid={computedTestId}
              className={computedInputClassName}
              ref={ref}
              id={id ?? otherProps.name}
              {...otherProps}
            ></textarea>
          ) : null}

          {suffix}
          {isPassword ? (
            <button
              type="button"
              className="grid h-6 w-6 place-content-center text-base text-neutral-grey-500"
              onClick={handleToggleShow}
            >
              {!show ? <Icon icon="hugeicons:view" /> : null}
              {show ? <Icon icon="hugeicons:view-off-slash" /> : null}
            </button>
          ) : null}
        </div>

        {/* MESSAGE */}
        <ErrorText error={error} />
      </div>
    );
  },
);

export function InputPrefixIconWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <span className="mr-2 inline-block border-r border-neutral-grey-200 pr-2 text-neutral-grey-300">
      {children}
    </span>
  );
}
