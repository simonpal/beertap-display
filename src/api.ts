import { useQuery } from "react-query";
import { encode } from "js-base64";
import { useStorage } from "./utils/storage";
import { useEffect, useState } from "react";
import { BaseRecipe } from "./models";

const apiUrl = "https://api.brewfather.app/v2";
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

const fetchRecipes = (lastId: string) => {
  // const offset = page * 10;
  return fetch(`${apiUrl}/recipes?start_after=${lastId}`, {
    method: "GET",
    headers: header,
  }).then((res) => res.json());
};
const fetchRecipe = (id: string) =>
  fetch(`${apiUrl}/recipes${id ? `/${id}` : ""}`, {
    method: "GET",
    headers: header,
  }).then((res) => res.json());

export const useRecipes = (lastId: string) => {
  const [recipes, setRecipes] = useState<BaseRecipe[]>([]);
  const result = useQuery(`recipes-${lastId}`, () => fetchRecipes(lastId));

  const { data, error, isLoading } = result;

  useEffect(() => {
    if (data && data.length > 0) {
      setRecipes([
        ...recipes.filter(
          (rec) => !data.find((newRec: any) => newRec._id === rec._id)
        ),
        ...data,
      ]);
    }
  }, [data]);

  return { recipes, error, isLoading };
};
export const useRecipe = (id: string) => {
  const result = useQuery(`recipe-${id}`, () => fetchRecipe(id), {
    enabled: typeof id !== undefined,
  });

  const { data, error, isLoading } = result;

  return { data, error, isLoading };
};
