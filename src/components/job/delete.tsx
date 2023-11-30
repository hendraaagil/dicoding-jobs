import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
} from '@chakra-ui/react'
import { useRef } from 'react'

type DeleteConfirmationProps = {
  isOpen: boolean
  onClose: () => void
  onDelete: () => void
}

export const DeleteConfirmation = ({
  isOpen,
  onClose,
  onDelete,
}: DeleteConfirmationProps) => {
  const cancelRef = useRef(null)

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
      isCentered
    >
      <AlertDialogOverlay backdropFilter="blur(2px)">
        <AlertDialogContent mx={2} rounded="sm">
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Hapus Lowongan
          </AlertDialogHeader>

          <AlertDialogBody>
            Apa kamu yakin? Lowongan yang sudah dihapus tidak dapat
            dikembalikan.
          </AlertDialogBody>

          <AlertDialogFooter w="full" columnGap={4}>
            <Button
              onClick={onClose}
              ref={cancelRef}
              variant="outline"
              colorScheme="gray"
              w="full"
              bg="gray.50"
              rounded="sm"
            >
              Batal
            </Button>
            <Button
              onClick={onDelete}
              variant="outline"
              colorScheme="red"
              w="full"
              bg="red.100"
              rounded="sm"
              border="none"
              _hover={{ bg: 'red.200' }}
            >
              Hapus
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  )
}
