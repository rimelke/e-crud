import { destroyCookie, parseCookies, setCookie } from 'nookies'
import { Dispatch, SetStateAction, useState } from 'react'

const useCookieState = (name: string) => {
  const [value, setValue] = useState(parseCookies()[name])

  const newSetValue: Dispatch<SetStateAction<string>> = (newValue) => {
    setValue((oldValue) => {
      const resultValue =
        typeof newValue === 'function' ? newValue(oldValue) : newValue

      if (resultValue) setCookie(undefined, name, resultValue, { path: '/' })
      else destroyCookie(undefined, name, { path: '/' })

      return resultValue
    })
  }

  return [value, newSetValue] as const
}

export default useCookieState
