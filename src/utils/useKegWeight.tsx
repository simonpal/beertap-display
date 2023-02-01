import React from "react";
import { useQuery } from "react-query";

const token = process.env.HOME_ASSISTANT_TOKEN;
const baseUrl = process.env.HOME_ASSISTANT_URL;

const apiFetch = (url: string) => {
  return fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const useKegWeight = () => {
  const { isLoading, error, data } = useQuery("kegWeightData", () =>
    apiFetch(`${baseUrl}/states/sensor.vikt`).then((res) => res.json())
  );
  return { isLoading, error, data };
};
