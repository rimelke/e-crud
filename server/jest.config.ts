import { pathsToModuleNameMapper } from 'ts-jest'
import { compilerOptions } from './tsconfig.json'

export default {
  clearMocks: true,
  coverageProvider: 'v8',
  preset: 'ts-jest',
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>/'
  })
}
