import { ButtonHTMLAttributes, PropsWithChildren } from 'react'

interface ButtonProps {
  isLoading?: boolean
}

const Button = ({
  children,
  isLoading,
  disabled,
  className,
  ...rest
}: PropsWithChildren<ButtonProps> &
  ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button
    {...rest}
    disabled={disabled || isLoading}
    className={`${className} px-20 bg-indigo-500 text-white rounded-lg py-2 font-medium transition ${
      isLoading ? 'animate-pulse cursor-wait' : 'hover:bg-indigo-600'
    }`}>
    {children}
  </button>
)

export default Button
