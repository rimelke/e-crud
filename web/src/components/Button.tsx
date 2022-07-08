import { ButtonHTMLAttributes, PropsWithChildren } from 'react'

interface ButtonProps {
  isLoading?: boolean
  colorSchema?: 'indigo' | 'red'
}

const colorMaps = {
  indigo: {
    default: 'bg-indigo-500',
    dark: 'bg-indigo-600'
  },
  red: {
    default: 'bg-red-500',
    dark: 'bg-red-700'
  }
}

const Button = ({
  children,
  isLoading,
  disabled,
  className,
  colorSchema = 'indigo',
  ...rest
}: PropsWithChildren<ButtonProps> &
  ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button
    {...rest}
    disabled={disabled || isLoading}
    className={`${className} px-20 ${
      colorMaps[colorSchema].default
    } text-white rounded-lg py-2 font-medium transition ${
      isLoading
        ? 'animate-pulse cursor-wait'
        : `hover:${colorMaps[colorSchema].dark}`
    }`}>
    {children}
  </button>
)

export default Button
