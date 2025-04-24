import usePlacesAutocomplete from "use-places-autocomplete";

import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
  ComboboxOptionText,
} from "@reach/combobox";
import { ErrorText } from "../shared";

export function PlacesAutocomplete({
  setAddress,
  error,
}: {
  setAddress: (address: string) => void;
  error?: string;
}) {
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete();

  const handleSelect = async (address: string) => {
    setValue(address, false);
    setAddress(address);

    clearSuggestions();
  };
  return (
    <div>
      <Combobox onSelect={handleSelect}>
        <ComboboxInput
          value={value}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setValue(e.target.value)
          }
          disabled={!ready}
          className="combobox-input placeholder:text-grey-600 border py-2 px-4 w-full h-12 focus-within:border-b-2 !outline-0"
          placeholder="First line of address *"
        />
        <ComboboxPopover>
          <ComboboxList>
            {status === "OK" &&
              data.map(({ place_id, description }) => (
                <ComboboxOption
                  key={place_id}
                  value={description}
                  className="bg-white focus:bg-brand-primary focus:text-white relative flex w-full cursor-default items-center gap-2 hover:bg-brand-primary hover:text-white rounded-sm py-1.5 pr-8 pl-2 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2"
                >
                  <ComboboxOptionText />
                </ComboboxOption>
              ))}
          </ComboboxList>
        </ComboboxPopover>
      </Combobox>
      {error && <ErrorText error={error} />}
    </div>
  );
}
