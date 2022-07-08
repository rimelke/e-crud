import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import Title from '../components/Title'
import useRequest from '../hooks/useRequest'

const Activate = () => {
  const router = useRouter()
  const { handleRequest } = useRequest('/users/activate', 'patch')

  const { token } = router.query

  useEffect(() => {
    if (!token) return

    const handleActivate = async () => {
      const result = await handleRequest({ token })

      if (!result) return

      toast.success('Success! Account activated!', { autoClose: 10 * 1000 })

      router.replace('/login')
    }

    handleActivate()
  }, [token])

  return (
    <div className="h-screen flex justify-center items-center">
      <Title>Activating your account...</Title>
    </div>
  )
}

export default Activate
