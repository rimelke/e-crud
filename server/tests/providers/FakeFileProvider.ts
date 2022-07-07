import FileProvider, { File } from '@providers/FileProvider'

class FakeFileProvider implements FileProvider {
  count = {
    save: 0
  }
  savedFilesCount = 0

  async save(files: File[]) {
    this.count.save++
    this.savedFilesCount += files.length

    return files.map(() => 'https://picsum.photos/200')
  }
}

export default FakeFileProvider
