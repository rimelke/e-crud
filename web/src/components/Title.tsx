import { PropsWithChildren } from 'react'

const Title = ({ children }: PropsWithChildren) => (
  <h1 className="font-bold text-3xl text-indigo-500">{children}</h1>
)

export default Title
