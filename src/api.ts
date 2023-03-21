import {
  type UseQueryResult,
  useQuery,
  useMutation,
  useQueryClient,
  type UseMutationResult,
} from "react-query"
import { encode } from "js-base64"
import { useEffect, useMemo, useState } from "react"
import { type StorageSettings, type BaseRecipe, type KegStatus } from "./models"
import { type FullRecipe } from "./recipeModel"
import { useSettings } from "./utils/customHooks"

const apiUrl = "https://api.brewfather.app/v2"
const recipesLimit = 20
const storageSettings = localStorage.getItem("settings")
// let storedSettings: StorageSettings
// let token = ""
// if (storageSettings) {
//   storedSettings = JSON.parse(storageSettings)
//   if (storedSettings?.brewfatherUserId && storedSettings?.brewfatherApiKey) {
//     token = `Basic ${encode(
//       `${storedSettings.brewfatherUserId}:${storedSettings.brewfatherApiKey}`
//     )}`
//   }
// }
// const header = {
//   authorization: token,
// }

const generateToken = (
  brewfatherApiKey: string,
  brewfatherUserId: string
): string => {
  if (!brewfatherApiKey || !brewfatherUserId) return ""
  return `Basic ${encode(`${brewfatherUserId}:${brewfatherApiKey}`)}`
}

const fetchRecipes = async (
  lastId: string,
  options: any = {}
): Promise<Response> => {
  // const offset = page * 10;
  return await fetch(
    `${apiUrl}/recipes?start_after=${lastId}&limit=${recipesLimit}`,
    {
      method: "GET",
      ...options,
    }
  ).then(async (res) => await res.json())
}
const fetchRecipe = async (id: string, options: any = {}): Promise<Response> =>
  await fetch(`${apiUrl}/recipes${id ? `/${id}` : ""}`, {
    method: "GET",
    ...options,
  }).then(async (res) => await res.json())

interface UseRecipesResult {
  recipes: BaseRecipe[]
  error: unknown
  isLoading: boolean
  reachedLimit: boolean
}
export const useRecipes = (
  lastId: string,
  userId: string
): UseRecipesResult => {
  const [recipes, setRecipes] = useState<BaseRecipe[]>([])
  const [reachedLimit, setReachedLimit] = useState<boolean>(false)

  const { fbSettings } = useSettings()
  const queryEnabled = useMemo(
    () =>
      Boolean(
        typeof fbSettings?.brewfatherUserId !== "undefined" &&
          typeof fbSettings?.brewfatherApiKey !== "undefined" &&
          fbSettings?.brewfatherUserId !== "" &&
          fbSettings?.brewfatherApiKey !== ""
      ),
    [fbSettings]
  )
  const header = useMemo(
    () => ({
      authorization: generateToken(
        fbSettings?.brewfatherApiKey,
        fbSettings?.brewfatherUserId
      ),
    }),
    [fbSettings?.brewfatherApiKey, fbSettings?.brewfatherUserId]
  )

  const result = useQuery(
    `recipes-${lastId}`,
    async () => await fetchRecipes(lastId, { headers: header }),
    {
      enabled: queryEnabled,
    }
  )

  const { data, error, isLoading } = result as UseQueryResult<BaseRecipe[]>

  useEffect(() => {
    if (data && data.length < recipesLimit) {
      setReachedLimit(true)
    }
    if (data && data.length > 0) {
      setRecipes([
        ...recipes.filter(
          (rec) => !data.find((newRec: BaseRecipe) => newRec._id === rec._id)
        ),
        ...data,
      ])
    }
  }, [data])

  return { recipes, error, isLoading, reachedLimit }
}
export const useRecipe = (
  id: string
): {
  data: FullRecipe | undefined
  error: unknown
  isLoading: boolean
} => {
  const { fbSettings } = useSettings()
  const header = useMemo(
    () => ({
      authorization: generateToken(
        fbSettings?.brewfatherApiKey,
        fbSettings?.brewfatherUserId
      ),
    }),
    [fbSettings?.brewfatherApiKey, fbSettings?.brewfatherUserId]
  )
  const result = useQuery(
    [`recipe-${id}`, fbSettings?.brewfatherApiKey],
    async () => await fetchRecipe(id, { headers: header }),
    {
      enabled: typeof id !== "undefined" && typeof fbSettings !== "undefined",
    }
  )

  const { data, error, isLoading } = result as UseQueryResult<FullRecipe>

  return { data, error, isLoading }
}

/*
  Display API
*/

// const displayApiRequest = async <T>(options: any = {}): Promise<T> =>
//   await fetch(`${storedSettings.displayApiEndpoint}`, {
//     ...options,
//   }).then(async (res) => await res.json())

// export const useKegStatus = (): {
//   data: KegStatus[] | undefined
//   error: unknown
//   isLoading: boolean
//   isError: boolean
// } => {
//   const result = useQuery(
//     ["keg-status"],
//     async () => await displayApiRequest<KegStatus[]>(),
//     {
//       enabled: storedSettings.displayApiEndpoint !== "",
//     }
//   )

//   const { data, error, isLoading, isError } = result

//   return { data, error, isLoading, isError }
// }

// interface DisplayPostRequestItem {
//   recipeName: string
//   recipeColor: string
// }
// export const useKegMutation = (
//   mutationOptions?: any
// ): UseMutationResult<
//   DisplayPostRequestItem[],
//   unknown,
//   DisplayPostRequestItem[],
//   unknown
// > => {
//   const queryClient = useQueryClient()
//   const mutation = useMutation(
//     async (request: DisplayPostRequestItem[]) =>
//       await displayApiRequest<DisplayPostRequestItem[]>({
//         method: "POST",
//         body: JSON.stringify(request),
//       }),
//     {
//       onSuccess: async () => {
//         await queryClient.invalidateQueries(["keg-status"])
//       },
//       ...mutationOptions,
//     }
//   )
//   return mutation
// }
