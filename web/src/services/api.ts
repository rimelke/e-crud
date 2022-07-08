import axios from 'axios'
import { NextApiRequest, NextApiResponse, NextPageContext } from 'next'
import { parseCookies } from 'nookies'

export const baseURL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3333'

export const getApiClient = (
  ctx?:
    | Pick<NextPageContext, 'req' | 'res'>
    | {
        req: NextApiRequest
        res: NextApiResponse
      }
    | {
        req: any
        res: any
      },
  customAuthorization?: string
) => {
  const apiClient = axios.create({
    baseURL
  })

  apiClient.interceptors.request.use(async (config) => {
    const { token } = parseCookies(ctx)

    if (token) config.headers.Authorization = `Bearer ${token}`

    if (customAuthorization) config.headers.Authorization = customAuthorization

    return config
  })

  return apiClient
}

const api = getApiClient()

export default api
