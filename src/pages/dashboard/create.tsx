import type { Position, JobType, Location, Experience } from '@prisma/client'
import { useState } from 'react'
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

import {
  getExperiences,
  getJobTypes,
  getLocations,
  getPositions,
} from '@/libs/master'
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

const initialDescription = `<p><strong>Deskripsi Pekerjaan</strong></p>
  <p>Sebagai [Posisi Lowongan], Anda akan berpartisipasi dalam proses pembangunan aplikasi yang sedang dibangun dalam perusahaan [Nama Perusahaan]. Anda juga diharapkan mampu bekerja dalam tim.</p>
  <p><strong>Tanggung Jawab</strong></p>
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
  const [description, setDescription] = useState(initialDescription)

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
      <Container as="form" py={10} spacing={6} maxW="container.md">
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
            name="position"
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
          <RadioGroup name="jobType">
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
              name="position"
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
            <Stack direction="row" alignItems="center" columnGap={8}>
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
                />
              </InputGroup>
            </Stack>
            <FormHelperText>
              Anda tidak perlu mengisi kolom &ldquo;Maksimum&rdquo; jika yang
              dimasukkan adalah gaji pokok.
            </FormHelperText>
          </FormControl>

          <FormControl display="flex" alignItems="center" columnGap={2}>
            <Switch id="isSalaryVisible" name="isSalaryVisible" />
            <FormLabel htmlFor="isSalaryVisible" mb={0} color="gray.600">
              Tampilkan gaji
            </FormLabel>
          </FormControl>
        </Stack>

        <FormControl isRequired>
          <FormLabel>Minimum pengalaman bekerja</FormLabel>
          <RadioGroup name="experience">
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
          <Button variant="outline" w="full" rounded="unset">
            Batal
          </Button>
        </ButtonGroup>
      </Container>
    </Flex>
  )
}
