import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import data from "@/data/countries.json"; // Adjust the path based on your folder structure
export function useCountriesData(countryCode?: string, state?: string) {
  const [countries] = useState(data);
  const [states, setStates] = useState<any[]>([]); // Adjust type if necessary
  const [cities, setCities] = useState<any[]>([]); // Adjust type if necessary
  const [error, setError] = useState<string | null>(null);
  const findCountryByCountryCode = (code: string) => {
    return (
      countries.find(
        (country) =>
          country.dialCode === code ||
          country.name?.toLowerCase() === code?.toLowerCase()
      ) || null
    );
  };
  const countryData = findCountryByCountryCode(countryCode ?? "");
  const country = countryData?.name;
  useEffect(() => {
    if (country) {
      const fetchStates = async () => {
        try {
          const response = await axios.post(
            `https://countriesnow.space/api/v0.1/countries/states`,
            { country }
          );
          const data = response?.data?.data?.states.map(
            (data: { name: string }) => {
              return {
                label: data?.name,
                value: data?.name,
              };
            }
          );
          setStates(data); // Adjust based on the actual response structure
        } catch (error) {
          setError(`Failed to fetch states: ${error}`);
        }
      };
      const fetchCities = async () => {
        try {
          const response = await axios.post(
            `https://countriesnow.space/api/v0.1/countries/state/cities`,
            { country, state }
          );
          const data = response.data.data.map((data: string) => {
            return {
              label: data,
              value: data,
            };
          });
          setCities(data); // Adjust based on the actual response structure
        } catch (error) {
          setError(`Failed to fetch cities: ${error}`);
        }
      };
      fetchStates();
      fetchCities();
    }
  }, [country, state]);
  const memoizedCountries = useMemo(() => countries, [countries]);
  const countriesOptions = useMemo(() => {
    return countries.map((country) => ({
      label: country.name,
      value: country.name,
    }));
  }, [countries]);
  return {
    states,
    cities,
    countries: memoizedCountries,
    countriesOptions,
    error,
  };
}
