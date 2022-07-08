import { PropsWithChildren } from 'react'

const Button = ({ children }: PropsWithChildren) => (
  <button className="bg-indigo-500 text-white rounded-lg py-2 font-medium hover:bg-indigo-600 transition">
    {children}
  </button>
)

export default Button
