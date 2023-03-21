import { useQuery } from 'react-query'

const token = process.env.HOME_ASSISTANT_TOKEN
const baseUrl = process.env.HOME_ASSISTANT_URL

const apiFetch = async (url: string): Promise<any> => {
  return await fetch(url, {
    headers: {
      Authorization: `Bearer ${token ?? ''}`
    }
  })
}

export const useKegWeight = (): any => {
  const { isLoading, error, data } = useQuery(
    'kegWeightData',
    async () =>
      await apiFetch(`${baseUrl ?? ''}/states/sensor.vikt`).then(
        async (res): Promise<any> => {
          const data = await res.json()
          return data
        }
      )
  )
  return { isLoading, error, data }
}
