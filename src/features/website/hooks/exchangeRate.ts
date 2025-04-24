import { useQuery } from "@tanstack/react-query";
import { getExchangeRate, getVisitorsIP, getLocationFromIP } from "../service";

export function useExchangeRate(currency: string) {
  const { data, isPending } = useQuery({
    queryKey: ["exchange-rate"],
    queryFn: () => getExchangeRate(currency),
    select: (data) => data.data,
    enabled: !!currency,
  });

  return { data, isPending };
}

export function useGetVisitorsIP() {
  const { data, isPending } = useQuery({
    queryKey: ["get-visitors-ap"],
    queryFn: getVisitorsIP,
    select: (data) => data,
  });

  return { data, isPending };
}

export function useGetLocationFromIP(ipAddress: string) {
  const { data, isPending } = useQuery({
    queryKey: ["get-location-from-ip"],
    queryFn: () => getLocationFromIP(ipAddress),
    select: (data) => data,
    enabled: !!ipAddress,
  });

  return { data, isPending };
}

// export function useExchangeRateByCountryCode(countryCode: string) {
//   const { data, isPending } = useQuery({
//     queryKey: ["exchange-rate-by-country-code"],
//     queryFn: () => getExchangeRateByCountryCode(countryCode),
//   });
// }

// const getVisitorsIP = async () => {
//     const response = await fetch("https://api.ipify.org?format=json");
//     const data = await response.json();
//     setIpAddress(data.ip);
//   };
