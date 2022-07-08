import { ChangeEvent, InputHTMLAttributes } from 'react'
import { useFormContext, useFormState } from 'react-hook-form'

interface Props {
  precision?: number
  prefix?: string
  label?: string
  name: string
}

const NumberInput = ({
  precision = 2,
  prefix = '',
  className,
  name,
  label,
  ...rest
}: Props & InputHTMLAttributes<HTMLInputElement>) => {
  const { register } = useFormContext()
  const { errors } = useFormState({ name })

  const getValue = (rawValue: string) => {
    return rawValue
      ? Number(rawValue.replace(prefix, '').replace(/\D/g, '')) /
          Math.pow(10, precision)
      : undefined
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = getValue(e.target.value)

    e.target.value = newValue ? prefix + newValue.toFixed(precision) : ''
  }

  const { onChange, ...restRegister } = register(name)

  return (
    <div className="flex flex-col gap-1">
      {label && <span className="ml-4">{label}</span>}

      <input
        onChange={(e) => {
          handleChange(e)
          onChange(e)
        }}
        className="focus:border-indigo-400 rounded-lg border outline-none py-2 px-4 border-slate-200 bg-slate-50"
        {...rest}
        {...restRegister}
      />

      {errors[name] && (
        <span className="text-red-400 ml-4 text-sm">
          {errors[name].message as unknown as string}
        </span>
      )}
    </div>
  )
}

export default NumberInput
