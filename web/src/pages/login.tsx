import { FormProvider, useForm } from 'react-hook-form'
import Button from '../components/Button'
import Input from '../components/Input'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import useRequest from '../hooks/useRequest'
import { useAuth } from '../contexts/AuthContext'
import Router from 'next/router'
import Link from '../components/Link'
import Title from '../components/Title'

const schema = yup
  .object()
  .shape({
    email: yup
      .string()
      .email('Email must be a valid email')
      .required('Email is required'),
    password: yup.string().required('Password is required')
  })
  .required()

const Login = () => {
  const form = useForm({
    resolver: yupResolver(schema)
  })
  const { setToken } = useAuth()

  const { isLoading, handleRequest } = useRequest('/users/login')

  const onSubmit = async (data) => {
    const result = await handleRequest(data)

    if (!result) return

    setToken(result.token)

    Router.push('/')
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4">
          <Title>Sign in your account</Title>
          <Input name="email" label="Email" />
          <Input type="password" name="password" label="Password" />
          <Link href="/register">Create an account</Link>
          <Button isLoading={isLoading} type="submit">
            Sign In
          </Button>
        </form>
      </FormProvider>
    </div>
  )
}

export default Login
