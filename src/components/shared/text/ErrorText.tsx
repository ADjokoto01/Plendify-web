import { cn } from "@/lib/utils";
import { Text } from "./Text";

type Props = Readonly<{
  error?: string | { message: string } | boolean;
  className?: string;
}>;

export function ErrorText({ error, className }: Props) {
  return error && typeof error !== "boolean" ? (
    <Text variant="span" className={cn("text-semantics-red mt-1", className)}>
      {typeof error === "string" ? error : error?.message}
    </Text>
  ) : null;
}
