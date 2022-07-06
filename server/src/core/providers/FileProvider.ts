interface FileDTO {
  name: string
  size: number
  type: string
  extension: string
  content: any
}

export class File {
  name: string
  size: number
  type: string
  extension: string
  content: any

  constructor(data: FileDTO) {
    this.name = data.name
    this.size = data.size
    this.type = data.type
    this.extension = data.extension
    this.content = data.content
  }
}

interface FileProvider {
  save(files: File[]): Promise<string[]>
}

export default FileProvider
