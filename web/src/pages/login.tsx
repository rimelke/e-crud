import Button from '../components/Button'
import Input from '../components/Input'

const Login = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <form className="flex flex-col gap-4">
        <Input label="Email" />
        <Input label="Password" />
        <Button>Sign In</Button>
      </form>
    </div>
  )
}

export default Login
