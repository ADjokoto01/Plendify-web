import { useRef } from 'react';
import { useElementOnScreen } from './useElementOnScreen';

type Props = {
  readonly children: any;
  readonly rotate?: any;
  readonly fade?: any;
};

export function AnimatedSection({ rotate, fade, children }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const onScreen = useElementOnScreen(ref);

  const DefaultStyles = {
    opacity: onScreen ? 1 : 0,
    translate: onScreen ? 'none' : '0 2rem',
    transition: '600ms ease-in-out',
  };

  const RotateStyles = {
    opacity: onScreen ? 1 : 0,
    translate: onScreen ? 'none' : '0 2rem',
    transform: onScreen ? 'none' : 'rotate(60deg)',
    transition: '600ms ease-in-out',
  };

  const FadeInStyles = {
    opacity: onScreen ? 1 : 0.7,
    transition: '600ms ease-in-out',
  };

  return (
    <div
      ref={ref}
      style={rotate ? RotateStyles : fade ? FadeInStyles : DefaultStyles}
    >
      {children}
    </div>
  );
}
