import { Dispatch, SetStateAction } from 'react'
import { Box, IconButton, Stack } from '@chakra-ui/react'
import { Editor, EditorContent, useEditor } from '@tiptap/react'
import {
  Bold,
  Code2,
  Heading1,
  Heading2,
  Heading3,
  Image as ImageIcon,
  Italic,
  Link as LinkIcon,
  List,
  ListOrdered,
  Underline as UnderlineIcon,
} from 'lucide-react'

import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'

const Menu = ({ editor }: { editor: Editor | null }) => {
  const linkHandler = () => {
    const previousUrl = editor?.getAttributes('link').href
    const url = window.prompt('Masukkan URL', previousUrl)

    // If cancelled, do nothing
    if (url === null) {
      return
    }

    // If empty, remove link
    if (url === '') {
      editor?.chain().focus().extendMarkRange('link').unsetLink().run()
      return
    }

    // Update link
    editor?.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
  }

  const imageHandler = () => {
    const url = window.prompt('Masukkan URL')

    if (url) {
      editor?.chain().focus().setImage({ src: url }).run()
    }
  }

  return (
    <Stack
      direction="row"
      p={2}
      borderBottom="1px"
      borderColor="gray.200"
      overflow="auto"
    >
      <Stack direction="row" pr={2} borderRight="2px" borderColor="gray.200">
        <IconButton
          rounded="sm"
          aria-label="Heading 1"
          icon={<Heading1 size={20} />}
          bg={editor?.isActive('heading', { level: 1 }) ? 'gray.200' : 'white'}
          onClick={() =>
            editor?.chain().focus().toggleHeading({ level: 1 }).run()
          }
        />
        <IconButton
          rounded="sm"
          aria-label="Heading 2"
          icon={<Heading2 size={20} />}
          bg={editor?.isActive('heading', { level: 2 }) ? 'gray.200' : 'white'}
          onClick={() =>
            editor?.chain().focus().toggleHeading({ level: 2 }).run()
          }
        />
        <IconButton
          rounded="sm"
          aria-label="Heading 3"
          icon={<Heading3 size={20} />}
          bg={editor?.isActive('heading', { level: 3 }) ? 'gray.200' : 'white'}
          onClick={() =>
            editor?.chain().focus().toggleHeading({ level: 3 }).run()
          }
        />
      </Stack>
      <Stack direction="row" pr={2} borderRight="2px" borderColor="gray.200">
        <IconButton
          rounded="sm"
          aria-label="Bold"
          icon={<Bold size={20} />}
          bg={editor?.isActive('bold') ? 'gray.200' : 'white'}
          onClick={() => editor?.chain().focus().toggleBold().run()}
        />
        <IconButton
          rounded="sm"
          aria-label="Italic"
          icon={<Italic size={20} />}
          bg={editor?.isActive('italic') ? 'gray.200' : 'white'}
          onClick={() => editor?.chain().focus().toggleItalic().run()}
        />
        <IconButton
          rounded="sm"
          aria-label="Underline"
          icon={<UnderlineIcon size={20} />}
          bg={editor?.isActive('underline') ? 'gray.200' : 'white'}
          onClick={() => editor?.chain().focus().toggleUnderline().run()}
        />
      </Stack>
      <Stack direction="row" pr={2} borderRight="2px" borderColor="gray.200">
        <IconButton
          rounded="sm"
          aria-label="Ordered list"
          icon={<ListOrdered size={20} />}
          bg={editor?.isActive('orderedList') ? 'gray.200' : 'white'}
          onClick={() => editor?.chain().focus().toggleOrderedList().run()}
        />
        <IconButton
          rounded="sm"
          aria-label="Bullet list"
          icon={<List size={20} />}
          bg={editor?.isActive('bulletList') ? 'gray.200' : 'white'}
          onClick={() => editor?.chain().focus().toggleBulletList().run()}
        />
      </Stack>
      <Stack direction="row">
        <IconButton
          rounded="sm"
          aria-label="Link"
          icon={<LinkIcon size={20} />}
          bg={editor?.isActive('link') ? 'gray.200' : 'white'}
          onClick={linkHandler}
        />
        <IconButton
          rounded="sm"
          aria-label="Image"
          icon={<ImageIcon size={20} />}
          bg={editor?.isActive('image') ? 'gray.200' : 'white'}
          onClick={imageHandler}
        />
        <IconButton
          rounded="sm"
          aria-label="Code"
          icon={<Code2 size={20} />}
          bg={editor?.isActive('code') ? 'gray.200' : 'white'}
          onClick={() => editor?.chain().focus().toggleCode().run()}
        />
      </Stack>
    </Stack>
  )
}

type RichTextProps = {
  content?: string
  setContent: Dispatch<SetStateAction<string>>
}

export const RichText = ({ content, setContent }: RichTextProps) => {
  const editor = useEditor({
    extensions: [
      Image,
      Link.configure({ openOnClick: false }),
      StarterKit,
      Underline,
    ],
    content,
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML())
    },
  })

  return (
    <Box border="1px" borderColor="gray.200" rounded="sm">
      <Menu editor={editor} />
      <Box py={2} px={{ base: 2, sm: 4 }} minH="xs" maxH="lg" overflow="auto">
        <EditorContent editor={editor} />
      </Box>
    </Box>
  )
}
