//suppressing ts-ignore for now
// @ts-ignore
import { FC, useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';

const WhatsappText: FC<any> = ({ value, onChange }) => {
  const _ref = useRef<any>(null);
  return (
    // @ts-ignore
    <Editor
      apiKey={process.env.NEXT_PUBLIC_TINY ?? ''}
      value={value}
      onInit={(evt, editor) => {
        _ref.current = editor;
      }}
      onEditorChange={(content) => onChange(content)}
      init={{
        height: 500,
        menubar: false,
        branding: false,
        plugins: ['emoticons', 'wordcount'],
        toolbar: 'bold italic strikethrough emoticons',
      }}
    />
  );
};

export default WhatsappText;
