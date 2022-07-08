import { PropsWithChildren } from 'react'
import NextLink from 'next/link'

interface Props {
  href: string
}

const Link = ({ children, href }: PropsWithChildren<Props>) => (
  <NextLink href={href}>
    <a className="text-indigo-500 hover:text-indigo-600 transition">
      {children}
    </a>
  </NextLink>
)

export default Link
