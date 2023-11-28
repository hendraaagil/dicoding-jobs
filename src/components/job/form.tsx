import type { Experience, JobType, Location, Position } from '@prisma/client'
import type { JobSchema, JobSchemaError } from '@/schemas/job'

import React from 'react'
import { AxiosError } from 'axios'
import {
  Button,
  ButtonGroup,
  Checkbox,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  InputGroup,
  InputLeftAddon,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Radio,
  RadioGroup,
  Select,
  Stack,
  Switch,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { createJob } from '@/apis/job'
import { Container } from '@/components/layout'
import { RichText } from '@/components/ui'

const initialDescription = `<h3>Deskripsi Pekerjaan</h3>
  <p>Sebagai [Posisi Lowongan], Anda akan berpartisipasi dalam proses pembangunan aplikasi yang sedang dibangun dalam perusahaan [Nama Perusahaan]. Anda juga diharapkan mampu bekerja dalam tim.</p>
  <h3>Tanggung Jawab</h3>
  <ul>
    <li>Membuat atau memodifikasi program yang sudah ada.</li>
    <li>Bertanggung jawab dalam mengelola program.</li>
  </ul>`

type JobFormProps = {
  choices: {
    positions: Position[]
    jobTypes: JobType[]
    locations: Location[]
    experiences: Experience[]
  }
  mode: 'create' | 'edit'
}

export const JobForm = ({
  choices: { experiences, jobTypes, locations, positions },
  mode,
}: JobFormProps) => {
  const [description, setDescription] = React.useState(initialDescription)
  const [errors, setErrors] = React.useState<JobSchemaError>({})
  const queryClient = useQueryClient()
  const router = useRouter()

  const mutation = useMutation({
    mutationFn: (job: JobSchema) => createJob(job),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['jobs'] })
      router.replace('/dashboard')
    },
    onError: (error: AxiosError<JobSchemaError>) => {
      if (error.response) {
        setErrors(error.response.data)
      }
    },
  })

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    formData.append('description', description)

    const data = Object.fromEntries(formData.entries()) as unknown as JobSchema
    mutation.mutate({
      ...data,
      expiresAt: data.expiresAt ? new Date(data.expiresAt).toISOString() : '',
      isCanRemote: Boolean(data.isCanRemote),
      isSalaryVisible: Boolean(data.isSalaryVisible),
      minSalary: Number(data.minSalary),
      maxSalary: Number(data.maxSalary) || undefined,
      maxCandidates: Number(data.maxCandidates),
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <Container py={10} spacing={6} maxW="container.md">
        <FormControl isInvalid={!!errors.title} isRequired>
          <FormLabel>Judul lowongan</FormLabel>
          <Input
            type="text"
            name="title"
            placeholder="Masukkan judul lowongan"
            rounded="unset"
          />
          {!!errors.title && (
            <FormErrorMessage>{errors.title[0]}</FormErrorMessage>
          )}
          <FormHelperText>Contoh: Android Native Developer</FormHelperText>
        </FormControl>

        <FormControl isInvalid={!!errors.positionId} isRequired>
          <FormLabel>Posisi</FormLabel>
          <Select
            name="positionId"
            placeholder="Pilih posisi yang dicari"
            color="gray.500"
            rounded="unset"
          >
            {positions.map((position) => (
              <option key={position.id} value={position.id}>
                {position.name}
              </option>
            ))}
          </Select>
          {!!errors.positionId && (
            <FormErrorMessage>{errors.positionId[0]}</FormErrorMessage>
          )}
        </FormControl>

        <FormControl isInvalid={!!errors.jobTypeId} isRequired>
          <FormLabel>Tipe Pekerjaan</FormLabel>
          <RadioGroup name="jobTypeId">
            <Stack>
              {jobTypes.map((jobType) => (
                <Radio key={jobType.id} value={jobType.id}>
                  {jobType.name}
                </Radio>
              ))}
            </Stack>
          </RadioGroup>
          {!!errors.jobTypeId && (
            <FormErrorMessage>{errors.jobTypeId[0]}</FormErrorMessage>
          )}
        </FormControl>

        <FormControl isInvalid={!!errors.maxCandidates} isRequired>
          <FormLabel>Kandidat yang dibutuhkan</FormLabel>
          <NumberInput min={1}>
            <NumberInputField
              type="number"
              name="maxCandidates"
              placeholder="Masukkan jumlah kandidat yang dibutuhkan"
              rounded="unset"
            />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          {!!errors.maxCandidates && (
            <FormErrorMessage>{errors.maxCandidates[0]}</FormErrorMessage>
          )}
        </FormControl>

        <FormControl isInvalid={!!errors.expiresAt} isRequired>
          <FormLabel>Aktif hingga</FormLabel>
          <Input
            type="date"
            name="expiresAt"
            min={new Date().toISOString().split('T')[0]}
            rounded="unset"
          />
          {!!errors.expiresAt && (
            <FormErrorMessage>{errors.expiresAt[0]}</FormErrorMessage>
          )}
        </FormControl>

        <Stack w="full">
          <FormControl isInvalid={!!errors.locationId} isRequired>
            <FormLabel>Lokasi</FormLabel>
            <Select
              name="locationId"
              placeholder="Pilih lokasi"
              color="gray.500"
              rounded="unset"
            >
              {locations.map((location) => (
                <option key={location.id} value={location.id}>
                  {location.name}
                </option>
              ))}
            </Select>
            {!!errors.locationId && (
              <FormErrorMessage>{errors.locationId[0]}</FormErrorMessage>
            )}
          </FormControl>
          <Checkbox name="isCanRemote" value="1">
            Bisa remote
          </Checkbox>
        </Stack>

        <FormControl isInvalid={!!errors.description} isRequired>
          <FormLabel>Deskripsi</FormLabel>
          <RichText content={description} setContent={setDescription} />
          <FormHelperText>
            Anda bisa mengubah template yang telah disediakan di atas.
          </FormHelperText>
        </FormControl>

        <Stack w="full">
          <FormControl isInvalid={!!errors.minSalary} isRequired>
            <FormLabel>Rentang gaji per bulan</FormLabel>
            <Stack
              direction="row"
              alignItems="center"
              columnGap={{ base: 2, sm: 8 }}
            >
              <InputGroup>
                <InputLeftAddon rounded="unset">Rp</InputLeftAddon>
                <Input
                  type="number"
                  min={1}
                  name="minSalary"
                  placeholder="Minimum"
                  rounded="unset"
                />
              </InputGroup>
              <span>-</span>
              <InputGroup>
                <InputLeftAddon rounded="unset">Rp</InputLeftAddon>
                <Input
                  type="number"
                  min={1}
                  name="maxSalary"
                  placeholder="Maksimum (opsional)"
                  rounded="unset"
                  required={false}
                  errorBorderColor="gray.200"
                />
              </InputGroup>
            </Stack>
            {!!errors.minSalary && (
              <FormErrorMessage>{errors.minSalary[0]}</FormErrorMessage>
            )}
            <FormHelperText>
              Anda tidak perlu mengisi kolom &ldquo;Maksimum&rdquo; jika yang
              dimasukkan adalah gaji pokok.
            </FormHelperText>
          </FormControl>

          <FormControl display="flex" flexDir="column" columnGap={2}>
            <Stack direction="row">
              <Switch id="isSalaryVisible" name="isSalaryVisible" value="1" />
              <FormLabel htmlFor="isSalaryVisible" mb={0} color="gray.600">
                Tampilkan gaji
              </FormLabel>
            </Stack>
            <FormHelperText>
              Gaji akan ditampilkan di lowongan pekerjaan dan dapat dilihat oleh
              kandidat.
            </FormHelperText>
          </FormControl>
        </Stack>

        <FormControl isInvalid={!!errors.experienceId} isRequired>
          <FormLabel>Minimum pengalaman bekerja</FormLabel>
          <RadioGroup name="experienceId">
            <Stack>
              {experiences.map((experience) => (
                <Radio key={experience.id} value={experience.id}>
                  {experience.name}
                </Radio>
              ))}
            </Stack>
          </RadioGroup>
          {!!errors.experienceId && (
            <FormErrorMessage>{errors.experienceId[0]}</FormErrorMessage>
          )}
        </FormControl>

        <ButtonGroup w="full">
          <Button
            type="submit"
            w="full"
            bg="navy"
            color="white"
            rounded="unset"
            _hover={{ bg: 'gray.600' }}
          >
            Buat lowongan
          </Button>
          <Button
            variant="outline"
            w="full"
            rounded="unset"
            onClick={() => router.replace('/dashboard')}
          >
            Batal
          </Button>
        </ButtonGroup>
      </Container>
    </form>
  )
}