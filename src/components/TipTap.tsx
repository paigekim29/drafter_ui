'use client';

import Placeholder from '@tiptap/extension-placeholder';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

interface TipTapProps {
  setContent: React.Dispatch<React.SetStateAction<string>>;
}

const Tiptap = ({ setContent }: TipTapProps) => {
  const editor = useEditor({
    extensions: [StarterKit, Placeholder.configure({ placeholder: '다듬고 싶은 글이나 초안을 입력해주세요' })],
    onUpdate({ editor }) {
      setContent(editor.getText());
    },
    immediatelyRender: false,
  });

  return <EditorContent editor={editor} />;
};

export default Tiptap;
