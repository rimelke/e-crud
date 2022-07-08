import { useRef } from 'react'
import { useFormContext, useFormState } from 'react-hook-form'

interface Props {
  name: string
  label?: string
}

const Textarea = ({ name, label }: Props) => {
  const { register } = useFormContext()
  const { errors } = useFormState({ name })
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const { ref, ...rest } = register(name)

  return (
    <div className="flex flex-col gap-1">
      {label && <span className="ml-4">{label}</span>}

      <textarea
        ref={(v) => {
          textareaRef.current = v
          ref(v)
        }}
        onInput={(e) => {
          textareaRef.current.style.height = '1px'
          textareaRef.current.style.height = `${
            e.currentTarget.scrollHeight +
            e.currentTarget.offsetHeight -
            e.currentTarget.clientHeight
          }px`
        }}
        {...rest}
        className="min-h-28 resize-none focus:border-indigo-400 rounded-lg border outline-none py-2 px-4 border-slate-200 bg-slate-50"
      />

      {errors[name] && (
        <span className="text-red-400 ml-4 text-sm">
          {errors[name].message as unknown as string}
        </span>
      )}
    </div>
  )
}

export default Textarea
