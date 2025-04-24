import { FilledStar } from '@/assets/svgs/svgs';
import { cn } from '@/lib';
import { Text } from '../shared';

type Props = {
  rating: number;
  className?: string;
  showCount?: boolean;
  reviewCount?: string;
};

export function StarRating({
  rating,
  className,
  showCount,
  reviewCount,
}: Props) {
  const ratingValue = Math.min(5, Math.max(0, Math.round(rating)));

  return (
    <div className="flex gap-1 items-center">
      {Array.from({ length: 5 }, (_, i) => {
        const isFilled = i < ratingValue;

        return (
          <FilledStar
            key={i}
            className={cn(
              isFilled ? 'text-brand-primary' : 'text-gray-100',
              'w-4 h-4',
              className,
            )}
          />
        );
      })}
      {showCount && (
        <Text variant="span" className="pt-[2px]">
          ({reviewCount})
        </Text>
      )}
    </div>
  );
}
