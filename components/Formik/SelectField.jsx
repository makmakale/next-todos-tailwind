'use client';

import {cn} from '@/lib/utils/utils';
//
import {Label} from '@/components/ui/label';
//
import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';
import {useEffect, useState, useTransition} from 'react';
import {Loader2} from 'lucide-react';

const SelectField = ({
  label = 'Unknown',
  options,
  getOptions,
  helperText,
  required,
  className,
  field: {name, value},
  form: {
    touched,
    errors,
    setFieldValue,
  },
}) => {
  const id = `${name}-form-item`;
  const isError = errors[name] && touched[name];
  const error = isError && errors[name];

  const [localOptions, setOptions] = useState(options || []);
  const [isLoading, startTransition] = useTransition();
  const [fetchError, setFetchError] = useState('');

  const onValueChange = selectedValue => {
    setFieldValue(name, `${selectedValue}`);
  };

  useEffect(() => {
    if (getOptions) {
      startTransition(async () => {
        const {data, error} = await getOptions();

        if (data) {
          setOptions(data);

          if (!value) {
            const defaultValue = data.find(opt => opt.isDefault)?.value || '';
            onValueChange(defaultValue);
          }
        }

        if (error) {
          setFetchError(error);
        }
      });
    }
  }, [getOptions, name, value]);

  return (
    <div className={cn('w-full space-y-2 mb-4', className)}>
      {label ? (
        <Label htmlFor={id} className={cn(error && 'text-destructive')}>
          {label}{required && '*'}
        </Label>
      ) : null}

      <div className="relative flex">
        <Select
          value={`${value}`}
          onValueChange={onValueChange}
          required={required}
        >
          <RenderSelectTrigger
            id={id}
            name={name}
            isLoading={isLoading}
            value={value}
            error={fetchError || error}
          />

          <SelectContent side="bottom">
            <SelectGroup>
              {localOptions.map(({label, value}) => (
                <SelectItem key={value} value={`${value}`}>
                  {label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
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

function RenderSelectTrigger({id, name, error, isLoading, value}) {
  if (!!error) {
    return (
      <p className={cn('w-full text-left')}>
        {error}
      </p>
    )
  }

  return (
    <SelectTrigger
      id={id}
      name={name}
      className={cn(error && 'text-destructive')}
    >
      {isLoading
        ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
        : <SelectValue placeholder={value}/>
      }
    </SelectTrigger>
  )
}

export default SelectField;