import { useRouteError, useNavigate } from "react-router";

import { ErrorText } from "../text";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type Props = Readonly<{
  className?: string;
}>;
export default function ErrorPage({ className }: Props) {
  const error: any = useRouteError();
  console.error(error);
  const navigate = useNavigate();

  return (
    <div
      className={cn(
        "flex flex-col h-screen items-center justify-center text-center gap-4",
        className
      )}
    >
      <div className="flex flex-col gap-2">
        <h1 className="text-neutral-grey-600 text-2xl font-bold">Oops!</h1>
        <p className="text-neutral-grey-600">
          Sorry, an unexpected error has occurred.
        </p>
      </div>

      <ErrorText error={error.statusText || error.message} />
      <Button variant="outline" onClick={() => navigate(-1)}>
        Go back to previous page
      </Button>
    </div>
  );
}
