interface InputProps {
  label?: string
}

const Input = ({ label }: InputProps) => {
  return (
    <div className="flex flex-col gap-1">
      {label && <span className="ml-4">{label}</span>}

      <input className="focus:border-indigo-400 rounded-lg border outline-none py-2 px-4 border-slate-200 bg-slate-50" />
    </div>
  )
}

export default Input
