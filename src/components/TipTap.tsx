'use client'

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';

const Tiptap = () => {
  const editor = useEditor({
    extensions: [StarterKit, Placeholder.configure({ placeholder: 'Please write your text here.' })],
  })

  return <EditorContent editor={editor} />
}

export default Tiptap
