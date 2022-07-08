import { useController, useFormState } from 'react-hook-form'
import { ChangeEvent, useEffect, useRef, useState } from 'react'
import Button from './Button'

interface PreviewFileProps {
  url: string
}

const PreviewFile = ({ url }: PreviewFileProps) => {
  useEffect(() => () => URL.revokeObjectURL(url), [])

  return (
    <img
      className="w-20 h-20 object-cover border border-slate-200 rounded-lg overflow-hidden"
      src={url}
    />
  )
}

interface IFile {
  file?: File
  url: string
}

interface ImagesInputProps {
  defaultImages?: string[]
}

const ImagesInput = ({ defaultImages = [] }: ImagesInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [files, setFiles] = useState<IFile[]>([])
  const { field } = useController({ name: 'images' })
  const { errors } = useFormState({ name: 'images' })

  useEffect(() => {
    field.onChange(files.map((file) => file.file))
  }, [files])

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const acceptedFiles = [...e.target.files].filter((file) =>
      file.type.startsWith('image')
    )

    if (acceptedFiles.length === 0) return

    setFiles((prevFiles) => [
      ...prevFiles,
      ...acceptedFiles.map((file) => ({ file, url: URL.createObjectURL(file) }))
    ])
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex gap-2">
        {defaultImages.length > 0 || files.length > 0 ? (
          <>
            {defaultImages.map((url) => (
              <PreviewFile key={url} url={url} />
            ))}
            {files.map((file) => (
              <PreviewFile url={file.url} key={file.url} />
            ))}
          </>
        ) : (
          <span>No images selected</span>
        )}
      </div>

      <input
        ref={inputRef}
        className="hidden"
        onChange={handleChange}
        type="file"
        multiple
      />

      <Button type="button" onClick={() => inputRef.current.click()}>
        Add image
      </Button>

      {errors.images && (
        <span className="text-red-400 ml-4 text-sm">
          {errors.images.message as unknown as string}
        </span>
      )}
    </div>
  )
}

export default ImagesInput
