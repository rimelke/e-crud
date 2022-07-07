import { ProcessPromiseFunction } from 'bull'

interface Job<T> {
  process: ProcessPromiseFunction<T>
}

export default Job
