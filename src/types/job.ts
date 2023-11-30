export type JobQuery = {
  page?: string
  keyword?: string
}

export type JobItem = {
  slug: string
  title: string
  expiresAt: string
  jobType: { name: string }
  location: { name: string }
  experience: { name: string }
  id: string
  createdAt: string
}

export type JobPagination = {
  totalPage: number
  currentPage: number
  hasNextPage: boolean
  hasPrevPage: boolean
}

export type JobList = {
  data: JobItem[]
  pagination: JobPagination
}

export type JobDetail = {
  id: string
  slug: string
  title: string
  description: string
  maxCandidates: number
  minSalary?: number
  maxSalary?: number | null
  isSalaryVisible: boolean
  isCanRemote: boolean
  expiresAt: string
  createdAt: string
  updatedAt: string
  positionId: string
  jobTypeId: string
  locationId: string
  experienceId: string
  experience: {
    id: string
    name: string
    sequence: number
  }
  jobType: {
    id: string
    name: string
    sequence: number
  }
  location: {
    id: string
    name: string
    sequence: number
  }
  position: {
    id: string
    name: string
    sequence: number
  }
}
