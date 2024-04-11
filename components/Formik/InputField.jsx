'use client';

import {useState} from 'react';
import {cn} from '@/lib/utils/utils';
//
import {Label} from '@/components/ui/label';
import {Input} from '@/components/ui/input';
//
import {Eye, EyeOff} from 'lucide-react';
import {Button} from '@/components/ui/button';

const InputField = ({
  label = 'Unknown',
  type = 'text',
  required,
  helperText,
  className,
  field: {name},
  form: {
    touched,
    errors,
    values,
    handleChange,
    handleBlur,
  },
  ...props
}) => {
  const id = `${name}-form-item`;
  const isError = errors[name] && touched[name];
  const error = isError && errors[name];

  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword((show) => !show);

  return (
    <div className={cn('space-y-2 mb-4', className)}>
      {label ? (
        <Label htmlFor={id} className={cn(error && 'text-destructive', className)}>
          {label}{required && '*'}
        </Label>
      ) : null}

      <div className="relative flex">
        <Input
          id={id}
          type={type === 'password' ? showPassword ? 'text' : 'password' : type}
          required={required}
          autoComplete="off"
          name={name}
          value={values[name] || ''}
          error={error}
          onChange={handleChange}
          onBlur={handleBlur}
          {...props}
          className="w-full"
        />

        {type === 'password' ? (
          <Button type="button" variant="ghost" onClick={handleShowPassword} className="absolute top-0 right-0">
            {!showPassword ? <Eye/> : <EyeOff/>}
          </Button>
        ) : null}
      </div>

      {isError || helperText
        ? (
          <p className={cn('text-sm text-muted-foreground', error && 'text-destructive')}>
            {error || helperText}
          </p>
        )
        : null}
    </div>
  );
};

export default InputField;