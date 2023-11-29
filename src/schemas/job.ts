import { ZodError, z } from 'zod'

export const jobSchema = z
  .object({
    title: z
      .string({ required_error: 'Judul lowongan tidak boleh kosong!' })
      .min(1, 'Judul lowongan tidak boleh kosong!')
      .max(255, 'Judul lowongan maksimal 255 karakter!'),
    description: z
      .string({
        required_error: 'Deskripsi lowongan tidak boleh kosong!',
      })
      .min(1, 'Deskripsi lowongan minimal 1 karakter!'),

    maxCandidates: z.coerce
      .number({ required_error: 'Jumlah kandidat tidak boleh kosong!' })
      .min(1, 'Jumlah kandidat tidak boleh kosong!'),
    minSalary: z.coerce
      .number({ required_error: 'Minimal gaji tidak boleh kosong!' })
      .min(1, 'Minimal gaji tidak boleh kosong!'),
    maxSalary: z.coerce
      .number()
      .optional()
      .transform((val) => val || null),

    isSalaryVisible: z.coerce.boolean().optional(),
    isCanRemote: z.coerce.boolean().optional(),
    expiresAt: z.coerce
      .string({ required_error: 'Tanggal berakhir tidak boleh kosong!' })
      .transform((val) => new Date(val).toISOString())
      .refine((val) => new Date(val) > new Date(), {
        message: 'Tanggal berakhir harus lebih dari hari ini!',
      }),

    positionId: z
      .string({ required_error: 'Posisi tidak boleh kosong!' })
      .uuid('Posisi tidak boleh kosong!'),
    jobTypeId: z
      .string({ required_error: 'Tipe pekerjaan tidak boleh kosong!' })
      .uuid('Tipe pekerjaan tidak boleh kosong!'),
    locationId: z
      .string({ required_error: 'Lokasi tidak boleh kosong!' })
      .uuid('Lokasi tidak boleh kosong!'),
    experienceId: z
      .string({ required_error: 'Pengalaman tidak boleh kosong!' })
      .uuid('Pengalaman tidak boleh kosong!'),
  })
  .refine(
    (val) => {
      if (!val.maxSalary) return true
      return val.maxSalary > val.minSalary
    },
    {
      message: 'Maksimal gaji harus lebih besar dari minimal gaji!',
      path: ['maxSalary'],
    },
  )

export type JobSchema = z.infer<typeof jobSchema>

export type JobSchemaError = ZodError<JobSchema>['formErrors']['fieldErrors']
