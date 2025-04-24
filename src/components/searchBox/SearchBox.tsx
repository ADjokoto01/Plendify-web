import { ComponentProps } from "react";

import { Icon } from "@/lib";
import { Input } from "../Input";

export const SearchBox = ({
  value,
  onChange,
  ref,
  placeholder = "Search",
  ...props
}: ComponentProps<typeof Input> & {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  ref?: React.RefObject<HTMLInputElement & HTMLTextAreaElement>;
  placeholder?: string;
}) => {
  return (
    <Input
      ref={ref}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      prefix={<Icon icon="hugeicons:search-01" width="18" className="mr-2" />}
      innerClassName="bg-[#F2F4F5] rounded-full border-none max-w-[524px] w-full"
      inputClassName="text-sm placeholder:text-[#A6A8A9]"
      {...props}
    />
  );
};
