import { Card } from "@/components/shared";
import { Badge } from "@/components/ui/badge";

import { Link } from "react-router-dom";
import { ROUTES } from "@/utils";
type Props = {
  badge: string;
  cards: any;
  slice?: number;
};

export function CardSection({ badge, cards, slice = 4 }: Props) {
  return (
    <div className="flex flex-col gap-4">
      <Badge>{badge}</Badge>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {cards?.slice(0, slice).map((card: any) => (
          <Link key={card.id} to={`${ROUTES.PRODUCT_DETAIL}/search/${card.id}`}>
            <Card {...card} />
          </Link>
        ))}
      </div>
    </div>
  );
}
