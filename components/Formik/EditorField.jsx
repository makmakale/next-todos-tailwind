'use client'
import {useMemo, useState} from 'react'
import dynamic from 'next/dynamic'
import {cn} from "@/lib/utils/utils";
import {Label} from "@/components/ui/label";
import '@/styles/editor.css'
import {Button} from "@/components/ui/button";

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

  const [showSourceCode, setShowSourceCode] = useState(false)
  const toggleShowSourceCode = () => setShowSourceCode(show => !show)

  const onEditorChange = (value) => {
    setFieldValue(name, value)
  }

  if (!ReactQuill) return null

  return (
    <div className={cn('space-y-2 flex flex-col my-2', className)}>
      {label ? <Label htmlFor={name}>{label}</Label> : null}

      <div className="relative flex-grow flex flex-col">
        {showSourceCode ? (
          <textarea name={name} value={values[name]} onChange={handleChange} className="flex-grow text-xs p-2"/>
        ) : <ReactQuill
          theme="snow"
          id={name}
          modules={modules}
          formats={formats}
          value={values[name]}
          onChange={onEditorChange}
          className="flex flex-col flex-grow min-h-[250px]"
        />}

        <div className="flex justify-end mt-4">
          <Button variant="outline" onClick={toggleShowSourceCode}>Toggle</Button>
        </div>

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
