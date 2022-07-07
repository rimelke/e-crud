import { Readable } from 'stream'

interface FileDTO {
  name: string
  type: string
  extension: string
  content: Readable
}

export class File {
  name: string
  type: string
  extension: string
  content: Readable

  constructor(data: FileDTO) {
    this.name = data.name
    this.type = data.type
    this.extension = data.extension
    this.content = data.content
  }
}

interface FileProvider {
  save(files: File[]): Promise<string[]>
}

export default FileProvider
