export type JobList = {
  title: string
  expiresAt: Date
  jobType: { name: string }
  location: { name: string }
  experience: { name: string }
  id: string
  createdAt: Date
}
