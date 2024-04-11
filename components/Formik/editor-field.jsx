'use client'
import {useMemo} from 'react'
import dynamic from 'next/dynamic'
import {cn} from "@/lib/utils/utils";
import {Label} from "@/components/ui/label";
import '@/styles/editor.css'

const modules = {
  toolbar: [
    [{header: [1, 2, false]}],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{list: 'ordered'}, {list: 'bullet'}, {indent: '-1'}, {indent: '+1'}],
    ['link', 'image', 'color'],
    ['clean']
  ]
}

const formats = [
  'header',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
  'link', 'image', 'color'
]

const EditorField = (props) => {
  const {
    field: {name = 'description'},
    label,
    className,
    form: {
      values,
      handleChange,
      setFieldValue
    },
    helperText
  } = props

  // To avoid Uncaught Error: document is not defined
  const ReactQuill = useMemo(() => dynamic(() => import('react-quill'), {ssr: false}), [])

  const onEditorChange = (value) => {
    setFieldValue(name, value)
  }

  if (!ReactQuill) return null

  return (
    <div className={cn('space-y-2 flex flex-col', className)}>
      {label ? <Label>{label}</Label> : null}

      <div className="relative flex flex-grow">
        <ReactQuill
          theme="snow"
          id={name}
          modules={modules}
          formats={formats}
          value={values[name]}
          onChange={onEditorChange}
          className="flex flex-col flex-grow"
        />

        <textarea name={name} value={values[name]} onChange={handleChange} hidden/>

        {helperText
          ? (
            <p className={'text-sm text-muted-foreground'}>
              {helperText}
            </p>
          ) : null}
      </div>
    </div>
  )
}

export default EditorField
