import ReactFlagsSelect from "react-flags-select";
import { ErrorText } from "../shared";

export function CountrySelect({
  country,
  setCountry,
  error,
  disabled,
}: {
  country: string;
  setCountry: (country: string) => void;
  error?: string;
  disabled?: boolean;
}) {
  return (
    // i want the country name not the flag
    <div>
      <ReactFlagsSelect
        className="placeholder:text-grey-600"
        selected={country}
        onSelect={(code) => setCountry(code)}
        searchable
        disabled={disabled}
        placeholder="Search for a country *"
        selectButtonClassName="!rounded-none placeholder:text-grey-600 !border !border-black py-2 px-4 w-full h-12 focus-within:!border-b-2"
      />
      {error && <ErrorText error={error} />}
    </div>
  );
}
