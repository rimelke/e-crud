import { NextRequest, NextResponse } from 'next/server'

export const middleware = (req: NextRequest) => {
  const authorization = req.headers.get('authorization')

  if (!authorization) return NextResponse.redirect(new URL('/login', req.url))
}

export const config = {
  matcher: '/'
}
