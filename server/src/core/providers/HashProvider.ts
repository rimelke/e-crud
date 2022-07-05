interface HashProvider {
  hash(data: string): Promise<string>
  compare(value: string, hashed: string): Promise<boolean>
}

export default HashProvider
