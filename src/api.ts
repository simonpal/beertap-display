import { useQuery } from "react-query";
import { encode } from "js-base64";
import { useStorage } from "./utils/storage";

const apiUrl = "https://api.brewfather.app/v1";
const storageSettings = localStorage.getItem("settings");
let token = "";
if (storageSettings) {
  const settings = JSON.parse(storageSettings);
  if (settings?.brewfatherUserId && settings?.brewfatherApiKey) {
    token = `Basic ${encode(
      `${settings.brewfatherUserId}:${settings.brewfatherApiKey}`
    )}`;
  }
}
const header = {
  authorization: token,
};

const fetchRecipes = (page: number) => {
  const offset = page * 10;
  return fetch(`${apiUrl}/recipes?offset=${offset}`, {
    method: "GET",
    headers: header,
  }).then((res) => res.json());
};
const fetchRecipe = (id: string) =>
  fetch(`${apiUrl}/recipes${id ? `/${id}` : ""}`, {
    method: "GET",
    headers: header,
  }).then((res) => res.json());

export const useRecipes = (page: number) => {
  const result = useQuery(`recipes-${page}`, () => fetchRecipes(page));

  const { data, error, isLoading } = result;

  return { data, error, isLoading };
};
export const useRecipe = (id: string) => {
  const result = useQuery(`recipe-${id}`, () => fetchRecipe(id), {
    enabled: typeof id !== undefined,
  });

  const { data, error, isLoading } = result;

  return { data, error, isLoading };
};
