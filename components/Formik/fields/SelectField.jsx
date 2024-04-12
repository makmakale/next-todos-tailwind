'use client';

import {cn} from '@/lib/utils/utils';
import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';
import {useEffect, useState, useTransition} from 'react';
import {Loader2} from 'lucide-react';
import FormControl from "@/components/Formik/common/FormControl";
import FormLabel from "@/components/Formik/common/FormLabel";
import FormHelperText from "@/components/Formik/common/FormHelperText";

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
    if (getOptions && !localOptions.length) {
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
  }, [getOptions, localOptions.length, name, value]);

  return (
    <FormControl className={className}>
      <FormLabel label={label} id={id} isError={isError}/>

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

      <FormHelperText show={isError || helperText} isError={isError}>
        {error || helperText}
      </FormHelperText>
    </FormControl>
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