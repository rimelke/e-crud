import { InputHTMLAttributes } from 'react'
import { useFormState, useFormContext } from 'react-hook-form'

interface InputProps {
  label?: string
  name: string
}

type Props = InputHTMLAttributes<HTMLInputElement> & InputProps

const Input = ({ label, name, ...rest }: Props) => {
  const { register } = useFormContext()
  const { errors } = useFormState({ name })

  return (
    <div className="flex flex-col gap-1">
      {label && <span className="ml-4">{label}</span>}

      <input
        {...rest}
        {...register(name)}
        className="focus:border-indigo-400 rounded-lg border outline-none py-2 px-4 border-slate-200 bg-slate-50"
      />

      {errors[name] && (
        <span className="text-red-400 ml-4 text-sm">
          {errors[name].message as unknown as string}
        </span>
      )}
    </div>
  )
}

export default Input
