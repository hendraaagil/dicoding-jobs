import type {
  Position,
  JobType,
  Location,
  Experience,
  Prisma,
} from '@prisma/client'
import React from 'react'
import {
  Button,
  ButtonGroup,
  Checkbox,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
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
  Text,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import {
  getExperiences,
  getJobTypes,
  getLocations,
  getPositions,
} from '@/libs/master'
import { createJob } from '@/apis/job'
import { Container, Hero } from '@/components/layout'
import { RichText } from '@/components/ui'

export const getStaticProps = async () => {
  const [positions, jobTypes, locations, experiences] = await Promise.all([
    getPositions(),
    getJobTypes(),
    getLocations(),
    getExperiences(),
  ])

  return {
    props: { positions, jobTypes, locations, experiences },
  }
}

type PageProps = {
  positions: Position[]
  jobTypes: JobType[]
  locations: Location[]
  experiences: Experience[]
}

const initialDescription = `<h3>Deskripsi Pekerjaan</h3>
  <p>Sebagai [Posisi Lowongan], Anda akan berpartisipasi dalam proses pembangunan aplikasi yang sedang dibangun dalam perusahaan [Nama Perusahaan]. Anda juga diharapkan mampu bekerja dalam tim.</p>
  <h3>Tanggung Jawab</h3>
  <ul>
    <li>Membuat atau memodifikasi program yang sudah ada.</li>
    <li>Bertanggung jawab dalam mengelola program.</li>
  </ul>`

export default function Page({
  positions,
  jobTypes,
  locations,
  experiences,
}: PageProps) {
  const [description, setDescription] = React.useState(initialDescription)
  const queryClient = useQueryClient()
  const router = useRouter()

  const mutation = useMutation({
    mutationFn: (job: Prisma.JobCreateInput) => createJob(job),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['jobs'] })
      router.replace('/dashboard')
    },
  })

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    formData.append('description', description)

    const data = Object.fromEntries(
      formData.entries(),
    ) as unknown as Prisma.JobCreateInput
    mutation.mutate(data)
  }

  return (
    <Flex as="main" pt={14} minH="100vh" direction="column">
      <Hero>
        <Heading as="h1" size="2xl">
          Buat lowongan pekerjaan
        </Heading>
        <Text maxW="lg" fontWeight="500">
          Dicoding Jobs menghubungkan industri dengan talenta yang tepat.
          Mencari tim baru tidak harus melelahkan dan boros biaya.
        </Text>
      </Hero>

      <form onSubmit={handleSubmit}>
        <Container py={10} spacing={6} maxW="container.md">
          <FormControl isRequired>
            <FormLabel>Judul lowongan</FormLabel>
            <Input
              type="text"
              name="title"
              placeholder="Masukkan judul lowongan"
              rounded="unset"
            />
            <FormHelperText>Contoh: Android Native Developer</FormHelperText>
          </FormControl>

          <FormControl isRequired>
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
          </FormControl>

          <FormControl isRequired>
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
          </FormControl>

          <FormControl isRequired>
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
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Aktif hingga</FormLabel>
            <Input
              type="date"
              name="expiresAt"
              min={new Date().toISOString().split('T')[0]}
              rounded="unset"
            />
          </FormControl>

          <Stack w="full">
            <FormControl isRequired>
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
            </FormControl>
            <Checkbox name="isCanRemote">Bisa remote</Checkbox>
          </Stack>

          <FormControl isRequired>
            <FormLabel>Deskripsi</FormLabel>
            <RichText content={description} setContent={setDescription} />
            <FormHelperText>
              Anda bisa mengubah template yang telah disediakan di atas.
            </FormHelperText>
          </FormControl>

          <Stack w="full">
            <FormControl isRequired>
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
                    name="maxSalary"
                    placeholder="Maksimum (opsional)"
                    rounded="unset"
                    required={false}
                  />
                </InputGroup>
              </Stack>
              <FormHelperText>
                Anda tidak perlu mengisi kolom &ldquo;Maksimum&rdquo; jika yang
                dimasukkan adalah gaji pokok.
              </FormHelperText>
            </FormControl>

            <FormControl display="flex" flexDir="column" columnGap={2}>
              <Stack direction="row">
                <Switch id="isSalaryVisible" name="isSalaryVisible" />
                <FormLabel htmlFor="isSalaryVisible" mb={0} color="gray.600">
                  Tampilkan gaji
                </FormLabel>
              </Stack>
              <FormHelperText>
                Gaji akan ditampilkan di lowongan pekerjaan dan dapat dilihat
                oleh kandidat.
              </FormHelperText>
            </FormControl>
          </Stack>

          <FormControl isRequired>
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
    </Flex>
  )
}
