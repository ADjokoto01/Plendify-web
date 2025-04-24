import React from 'react';

import DefaultAvatar from '@/assets/images/avatar.png';
import { Icon } from '@/lib';

type AvatarProps = {
  src?: string | null;
  alt?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  fallback?: React.ReactNode;
};

const sizeClasses = {
  sm: 'h-11 w-11',
  md: 'h-16 w-16',
  lg: 'h-20 w-20',
};

export function Avatar({
  src,
  alt = 'User avatar',
  className = '',
  size = 'md',
  fallback,
}: AvatarProps) {
  const [error, setError] = React.useState(false);

  const handleError = () => {
    setError(true);
  };

  const imageSource = error || !src ? DefaultAvatar : src;

  if (error && fallback) {
    return (
      <div
        className={`flex items-center justify-center overflow-hidden shrink-0 rounded-full bg-neutral-grey-200 ${sizeClasses[size]} ${className}`}
      >
        {fallback}
      </div>
    );
  }

  return (
    <div
      className={`overflow-hidden rounded-full shrink-0 bg-grey-300 ${sizeClasses[size]} ${className}`}
    >
      {src ? (
        <img
          src={imageSource}
          alt={alt}
          className="h-full w-full object-cover"
          onError={handleError}
        />
      ) : (
        <Icon
          icon="hugeicons:user"
          className="h-full w-full object-cover p-2 text-xl"
        />
      )}
    </div>
  );
}
