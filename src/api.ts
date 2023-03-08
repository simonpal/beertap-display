import { type UseQueryResult, useQuery, useMutation } from "react-query";
import { encode } from "js-base64";
import { useEffect, useState } from "react";
import { type StorageSettings, type BaseRecipe, KegStatus } from "./models";
import { type FullRecipe } from "./recipeModel";

const apiUrl = "https://api.brewfather.app/v2";
const recipesLimit = 20;
const storageSettings = localStorage.getItem("settings");
let storedSettings: StorageSettings;
let token = "";
if (storageSettings) {
  storedSettings = JSON.parse(storageSettings);
  if (storedSettings?.brewfatherUserId && storedSettings?.brewfatherApiKey) {
    token = `Basic ${encode(
      `${storedSettings.brewfatherUserId}:${storedSettings.brewfatherApiKey}`
    )}`;
  }
}
const header = {
  authorization: token,
};

const fetchRecipes = async (lastId: string): Promise<Response> => {
  // const offset = page * 10;
  return await fetch(
    `${apiUrl}/recipes?start_after=${lastId}&limit=${recipesLimit}`,
    {
      method: "GET",
      headers: header,
    }
  ).then(async (res) => await res.json());
};
const fetchRecipe = async (id: string): Promise<Response> =>
  await fetch(`${apiUrl}/recipes${id ? `/${id}` : ""}`, {
    method: "GET",
    headers: header,
  }).then(async (res) => await res.json());

interface UseRecipesResult {
  recipes: BaseRecipe[];
  error: unknown;
  isLoading: boolean;
  reachedLimit: boolean;
}
export const useRecipes = (lastId: string): UseRecipesResult => {
  const [recipes, setRecipes] = useState<BaseRecipe[]>([]);
  const [reachedLimit, setReachedLimit] = useState<boolean>(false);
  const result = useQuery(
    `recipes-${lastId}`,
    async () => await fetchRecipes(lastId)
  );

  const { data, error, isLoading } = result as UseQueryResult<BaseRecipe[]>;

  useEffect(() => {
    if (data && data.length < recipesLimit) {
      setReachedLimit(true);
    }
    if (data && data.length > 0) {
      setRecipes([
        ...recipes.filter(
          (rec) => !data.find((newRec: any) => newRec._id === rec._id)
        ),
        ...data,
      ]);
    }
  }, [data]);

  return { recipes, error, isLoading, reachedLimit };
};
export const useRecipe = (
  id: string
): {
  data: FullRecipe | undefined;
  error: unknown;
  isLoading: boolean;
} => {
  const result = useQuery(`recipe-${id}`, async () => await fetchRecipe(id), {
    enabled: typeof id !== "undefined",
  });

  const { data, error, isLoading } = result as UseQueryResult<FullRecipe>;

  return { data, error, isLoading };
};

// Display API

const displayApiRequest = async (
  idx?: number,
  options?: any
): Promise<Response> =>
  await fetch(`${storedSettings.displayApiEndpoint}/${idx ? `/${idx}` : ""}`, {
    ...options,
  }).then(async (res) => await res.json());

const displayApiPostRequest = async (data: any): Promise<Response> =>
  await fetch(`${storedSettings.displayApiEndpoint}`, {
    method: "POST",
    body: JSON.stringify(data),
  }).then(async (res) => await res.json());

export const useKegStatus = (
  idx: number
): {
  data: KegStatus | undefined;
  error: unknown;
  isLoading: boolean;
} => {
  const result = useQuery(
    `keg-status`,
    async () => await displayApiRequest(idx),
    {
      enabled: typeof idx !== "undefined",
    }
  );

  const { data, error, isLoading } = result as UseQueryResult<KegStatus>;

  return { data, error, isLoading };
};

export const useKegMutation = () => {
  const { mutate, isLoading, isError } = useMutation(displayApiPostRequest, {
    onSuccess: (data) => {
      console.log(data);
      const message = "success";
      alert(message);
    },
    onError: () => {
      alert("there was an error");
    },
    //    onSettled: () => {
    //       queryClient.invalidateQueries('create')
    //  }
  });
  return { mutate, isLoading, isError };
};
