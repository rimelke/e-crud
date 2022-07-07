import * as jobs from '@jobs/index'
import Queue from 'bull'
import { BullAdapter } from '@bull-board/api/bullAdapter'
import Job from '@jobs/Job'

type extractGeneric<Type> = Type extends Job<infer T> ? T : unknown

export const addJob = async <K extends keyof typeof jobs>(
  job: K,
  data: extractGeneric<typeof jobs[K]>
) => {
  const queue = new Queue(job)

  await queue.add(data)
}

export const processAll = () => {
  Object.entries(jobs).forEach(([key, job]) => {
    const queue = new Queue(key)

    queue.process(job.process)
  })
}

export const getQueues = () =>
  Object.keys(jobs).map((job) => new BullAdapter(new Queue(job)))
