import { type UseQueryResult, useQuery } from 'react-query'
import { encode } from 'js-base64'
import { useEffect, useState } from 'react'
import { type StorageSettings, type BaseRecipe } from './models'
import { type FullRecipe } from './recipeModel'

const apiUrl = 'https://api.brewfather.app/v2'
const recipesLimit = 20
const storageSettings = localStorage.getItem('settings')
let token = ''
if (storageSettings) {
  const settings: StorageSettings = JSON.parse(storageSettings)
  if (settings?.brewfatherUserId && settings?.brewfatherApiKey) {
    token = `Basic ${encode(
      `${settings.brewfatherUserId}:${settings.brewfatherApiKey}`
    )}`
  }
}
const header = {
  authorization: token
}

const fetchRecipes = async (lastId: string): Promise<Response> => {
  // const offset = page * 10;
  return await fetch(
    `${apiUrl}/recipes?start_after=${lastId}&limit=${recipesLimit}`,
    {
      method: 'GET',
      headers: header
    }
  ).then(async (res) => await res.json())
}
const fetchRecipe = async (id: string): Promise<Response> =>
  await fetch(`${apiUrl}/recipes${id ? `/${id}` : ''}`, {
    method: 'GET',
    headers: header
  }).then(async (res) => await res.json())

interface UseRecipesResult {
  recipes: BaseRecipe[]
  error: unknown
  isLoading: boolean
  reachedLimit: boolean
}
export const useRecipes = (lastId: string): UseRecipesResult => {
  const [recipes, setRecipes] = useState<BaseRecipe[]>([])
  const [reachedLimit, setReachedLimit] = useState<boolean>(false)
  const result = useQuery(
    `recipes-${lastId}`,
    async () => await fetchRecipes(lastId)
  )

  const { data, error, isLoading } = result as UseQueryResult<BaseRecipe[]>

  useEffect(() => {
    if (data && data.length < recipesLimit) {
      setReachedLimit(true)
    }
    if (data && data.length > 0) {
      setRecipes([
        ...recipes.filter(
          (rec) => !data.find((newRec: any) => newRec._id === rec._id)
        ),
        ...data
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
  const result = useQuery(`recipe-${id}`, async () => await fetchRecipe(id), {
    enabled: typeof id !== 'undefined'
  })

  const { data, error, isLoading } = result as UseQueryResult<FullRecipe>

  return { data, error, isLoading }
}
