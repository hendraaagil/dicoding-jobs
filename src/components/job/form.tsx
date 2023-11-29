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
  useToast,
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
  const toast = useToast()

  const mutation = useMutation({
    mutationFn: (job: JobSchema) => createJob(job),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['jobs'] })
      router.replace('/dashboard')
      toast({
        title: 'Lowongan berhasil dibuat',
        status: 'success',
        variant: 'left-accent',
        position: 'bottom-right',
        duration: 3000,
      })
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
    mutation.mutate(data)
  }

  return (
    <form onSubmit={handleSubmit}>
      <Container spacing={6} maxW="container.md">
        <FormControl isInvalid={!!errors.title} isRequired>
          <FormLabel>Judul lowongan</FormLabel>
          <Input
            type="text"
            name="title"
            placeholder="Masukkan judul lowongan"
            rounded="sm"
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
            rounded="sm"
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
                <Radio key={jobType.id} value={jobType.id} colorScheme="navy">
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
              rounded="sm"
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
            rounded="sm"
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
              rounded="sm"
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
          <Checkbox name="isCanRemote" value="1" colorScheme="navy">
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
          <FormControl
            isInvalid={!!errors.minSalary || !!errors.maxSalary}
            isRequired
          >
            <FormLabel>Rentang gaji per bulan</FormLabel>
            <Stack
              direction="row"
              alignItems="center"
              columnGap={{ base: 2, sm: 8 }}
            >
              <InputGroup>
                <InputLeftAddon rounded="sm">Rp</InputLeftAddon>
                <Input
                  type="number"
                  min={1}
                  name="minSalary"
                  placeholder="Minimum"
                  rounded="sm"
                />
              </InputGroup>
              <span>-</span>
              <InputGroup>
                <InputLeftAddon rounded="sm">Rp</InputLeftAddon>
                <Input
                  type="number"
                  min={1}
                  name="maxSalary"
                  placeholder="Maksimum (opsional)"
                  rounded="sm"
                  required={false}
                  // errorBorderColor="gray.200"
                />
              </InputGroup>
            </Stack>
            {!!errors.minSalary && (
              <FormErrorMessage>{errors.minSalary[0]}</FormErrorMessage>
            )}
            {!!errors.maxSalary && (
              <FormErrorMessage>{errors.maxSalary[0]}</FormErrorMessage>
            )}
            <FormHelperText>
              Anda tidak perlu mengisi kolom &ldquo;Maksimum&rdquo; jika yang
              dimasukkan adalah gaji pokok.
            </FormHelperText>
          </FormControl>

          <FormControl display="flex" flexDir="column" columnGap={2}>
            <Stack direction="row">
              <Switch
                id="isSalaryVisible"
                name="isSalaryVisible"
                value="1"
                colorScheme="navy"
              />
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
                <Radio
                  key={experience.id}
                  value={experience.id}
                  colorScheme="navy"
                >
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
            bg="navy.500"
            color="white"
            rounded="sm"
            _hover={{ bg: 'gray.600' }}
            isLoading={mutation.isPending}
          >
            Buat lowongan
          </Button>
          <Button
            variant="outline"
            w="full"
            rounded="sm"
            onClick={() => router.replace('/dashboard')}
          >
            Batal
          </Button>
        </ButtonGroup>
      </Container>
    </form>
  )
}
