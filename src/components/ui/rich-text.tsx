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
  Underline as UnderlineIcon,
} from 'lucide-react'

import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'

const Menu = ({ editor }: { editor: Editor | null }) => {
  const linkHandler = () => {
    const previousUrl = editor?.getAttributes('link').href
    const url = window.prompt('URL', previousUrl)

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
    const url = window.prompt('URL')

    if (url) {
      editor?.chain().focus().setImage({ src: url }).run()
    }
  }

  return (
    <Stack direction="row" p={2} borderBottom="1px" borderColor="gray.200">
      <Stack direction="row" pr={2} borderRight="2px" borderColor="gray.200">
        <IconButton
          rounded="unset"
          aria-label="Heading 1"
          icon={<Heading1 size={20} />}
          bg={editor?.isActive('heading', { level: 1 }) ? 'gray.200' : 'white'}
          onClick={() =>
            editor?.chain().focus().toggleHeading({ level: 1 }).run()
          }
        />
        <IconButton
          rounded="unset"
          aria-label="Heading 2"
          icon={<Heading2 size={20} />}
          bg={editor?.isActive('heading', { level: 2 }) ? 'gray.200' : 'white'}
          onClick={() =>
            editor?.chain().focus().toggleHeading({ level: 2 }).run()
          }
        />
        <IconButton
          rounded="unset"
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
          rounded="unset"
          aria-label="Bold"
          icon={<Bold size={20} />}
          bg={editor?.isActive('bold') ? 'gray.200' : 'white'}
          onClick={() => editor?.chain().focus().toggleBold().run()}
        />
        <IconButton
          rounded="unset"
          aria-label="Italic"
          icon={<Italic size={20} />}
          bg={editor?.isActive('italic') ? 'gray.200' : 'white'}
          onClick={() => editor?.chain().focus().toggleItalic().run()}
        />
        <IconButton
          rounded="unset"
          aria-label="Underline"
          icon={<UnderlineIcon size={20} />}
          bg={editor?.isActive('underline') ? 'gray.200' : 'white'}
          onClick={() => editor?.chain().focus().toggleUnderline().run()}
        />
      </Stack>
      <Stack direction="row">
        <IconButton
          rounded="unset"
          aria-label="Link"
          icon={<LinkIcon size={20} />}
          bg={editor?.isActive('link') ? 'gray.200' : 'white'}
          onClick={linkHandler}
        />
        <IconButton
          rounded="unset"
          aria-label="Image"
          icon={<ImageIcon size={20} />}
          bg={editor?.isActive('image') ? 'gray.200' : 'white'}
          onClick={imageHandler}
        />
        <IconButton
          rounded="unset"
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
    <Box border="1px" borderColor="gray.200">
      <Menu editor={editor} />
      <Box py={2} px={4}>
        <EditorContent editor={editor} />
      </Box>
    </Box>
  )
}
