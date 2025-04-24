import React, { forwardRef, useCallback, useEffect, useState } from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import Phone from "phone";

import { useCountriesData } from "@/hooks";
import "./phoneNumber.css";

import { cn, Icon } from "@/lib";
import { Text } from "../shared";

interface Option {
  dialCode: string;
  flag: string;
  isoCode: string;
  name: string;
}
interface InputProps {
  label?: string;
  onChange: (value: string) => void;
  id?: string;
  isRequired?: boolean;
  name?: string;
  type?: string;
  error?: string;
  value: string;
  required?: boolean;
  disabled?: boolean;
}
export const PhoneInputField = forwardRef<HTMLInputElement, InputProps>(
  (
    { id, onChange, value, label, name, error, required, disabled, ...props },
    ref
  ) => {
    const { countries: options = [] } = useCountriesData();
    // Set default country as Nigeria (+234)
    const defaultPhoneState = options.find((code) => code.dialCode === "+233");
    const [country, setCountry] = useState<Option>(defaultPhoneState!);
    const [phone, setPhone] = useState<string>("");
    // Initialize phone state based on the value prop
    const initializePhoneState = useCallback(() => {
      if (value) {
        const phoneObj = Phone(value);
        if (phoneObj.isValid) {
          const newPhone = phoneObj.phoneNumber.split(phoneObj.countryCode);
          setPhone(newPhone[1] || "");
          const newCountry: Option = options.find(
            (code) => code.dialCode === phoneObj.countryCode
          )!;
          setCountry(newCountry);
        }
      } else {
        setPhone("");
      }
    }, [options, value]);

    useEffect(() => {
      initializePhoneState();
    }, [value, initializePhoneState]);
    // Ensure onChange is called when the country or phone changes
    useEffect(() => {
      if (phone) onChange(country?.dialCode + phone);
    }, [country, phone, onChange]);
    // Handle phone number changes
    function extractDigits(value: string) {
      return value.replace(/\D/g, ""); // Replace non-digit characters
    }
    function onNumberChange(e: React.ChangeEvent<HTMLInputElement>) {
      const rawValue = e.target.value;
      const cleanNumber = extractDigits(rawValue);
      // Remove leading zero if present
      const number = cleanNumber.startsWith("0")
        ? cleanNumber.slice(1)
        : cleanNumber;
      setPhone(number);
      // Call onChange with the new value
      onChange(number ? country?.dialCode + number : "");
    }
    return (
      <div className="grid gap-[6px]">
        {label && (
          <Text variant="span" className=" h-fit " htmlFor={id}>
            {label}
            {required ? <span className="text-red-900">*</span> : null}
          </Text>
        )}
        <div
          className={cn(
            "h-12 px-3 grid gap-1 grid-cols-[max-content_1fr] border focus-within:border-green-primary disabled:cursor-not-allowed",
            {
              "bg-[#f5f5f5] border border-grey-100 cursor-not-allowed":
                disabled,
            },
            {
              "border-red-600": error,
            }
          )}
        >
          <DropdownMenu.Root>
            <DropdownMenu.Trigger
              data-testid="dropdownbutton"
              disabled={disabled}
              className={cn(
                "outline-none flex gap-1 items-center",
                disabled && "cursor-not-allowed"
              )}
            >
              <div className="grid gap-2 items-center grid-cols-[24px_min-content]">
                {country?.flag && (
                  <img
                    className="object-cover h-[18px] rounded-sm"
                    alt={country?.name}
                    src={country?.flag}
                  />
                )}
                <p className="font-normal text-black-600">
                  {country?.dialCode}
                </p>
              </div>
              <div className="transition-all focus:rotate-180">
                <Icon icon="mdi:chevron-down" />
              </div>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content className="z-10 max-w-max max-h-[300px] overflow-auto grid gap-2 bg-white p-3 rounded-lg border border-[#EAECF0] shadow-[5px_5px_20px_0px_rgba(0,0,0,0.1)]">
              {options.map((option) => (
                <DropdownMenu.Item
                  key={option.isoCode}
                  className="outline-none grid grid-cols-[24px_1fr] items-center px-2 py-[6px] gap-2 rounded-sm hover:bg-black-50 text-black-600"
                  onSelect={() => setCountry(option)}
                >
                  <img alt={option.name} src={option.flag} />
                  <p className="text-sm font-normal">{option.name}</p>
                </DropdownMenu.Item>
              ))}
            </DropdownMenu.Content>
          </DropdownMenu.Root>
          <input
            data-testid={id}
            className="outline-none w-full"
            ref={ref}
            id={id}
            name={name}
            type="tel"
            disabled={disabled}
            autoComplete="tel"
            value={phone || ""}
            onChange={onNumberChange}
            {...props}
          />
        </div>
        {error && (
          <Text variant="span" className="text-xs text-red-600">
            {error}
          </Text>
        )}
      </div>
    );
  }
);
PhoneInputField.displayName = "PhoneInputField";
