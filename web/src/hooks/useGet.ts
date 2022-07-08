import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import api from '../services/api'

const useGet = <T = any>(
  url: string
): {
  isLoading: boolean
  data?: T
  setData: Dispatch<SetStateAction<T>>
} => {
  const [value, setValue] = useState<T>()
  const [isLoading, setIsLoading] = useState(false)

  const getResource = async () => {
    try {
      setIsLoading(true)

      const { data } = await api.get(url)

      setValue(data)
    } catch (err) {
      console.error(err)

      const message: string =
        err.response?.data?.message || err.message || 'Failed to make request!'

      toast.error(message.charAt(0).toUpperCase() + message.substring(1))
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getResource()
  }, [])

  return { isLoading, data: value, setData: setValue }
}

export default useGet
