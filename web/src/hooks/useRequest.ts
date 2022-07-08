import { useState } from 'react'
import { toast } from 'react-toastify'
import api from '../services/api'

const useRequest = (
  url: string,
  type: 'post' | 'patch' | 'delete' = 'post'
) => {
  const [isLoading, setIsLoading] = useState(false)

  const handleRequest = async (data?: any) => {
    setIsLoading(true)
    try {
      const response = await api[type](url, data)

      return response.data
    } catch (err) {
      console.error(err)

      const message: string =
        err.response?.data?.message || err.message || 'Failed to make request!'

      toast.error(message.charAt(0).toUpperCase() + message.substring(1))
    } finally {
      setIsLoading(false)
    }
  }

  return { isLoading, handleRequest }
}

export default useRequest
