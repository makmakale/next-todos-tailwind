import {cn} from "@/lib/utils";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";

const InputField = ({
  label = "Unknown",
  type = 'text',
  helperText,
  className,
  field: {name},
  form: {
    touched,
    errors,
    values,
    handleChange,
    handleBlur
  },
  ...props
}) => {
  const id = `${name}-form-item`
  const isError = errors[name] && touched[name]
  const error = isError && errors[name]

  return (
    <div className={cn("space-y-2 mb-4", className)} {...props}>
      {label ? (
        <Label htmlFor={id} className={cn(error && "text-destructive", className)}>
          {label}
        </Label>
      ) : null}

      <Input
        id={id}
        name={name}
        value={values[name] || ''}
        error={error}
        onChange={handleChange}
        onBlur={handleBlur}
        {...props}
      />

      {isError || helperText
        ? (
          <p className={cn("text-sm text-muted-foreground", error && "text-destructive")}>
            {error || helperText}
          </p>
        )
        : null}
    </div>
  );
};

export default InputField;