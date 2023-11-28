export type JobQuery = {
  page?: string
}

export type JobItem = {
  title: string
  expiresAt: string
  jobType: { name: string }
  location: { name: string }
  experience: { name: string }
  id: string
  createdAt: string
}

export type JobList = {
  data: JobItem[]
  pagination: {
    totalPage: number
    currentPage: number
    hasNextPage: boolean
    hasPrevPage: boolean
  }
}
