'use client';

import {cn} from '@/lib/utils/utils';
//
import {Label} from '@/components/ui/label';
//
import {Avatar, AvatarImage} from "@/components/ui/avatar";

const UserWithAvatarField = ({
  label = 'Reporter',
  user,
  helperText,
  className,
  field: {name},
  form: {
    touched,
    errors,
  },
}) => {
  const id = `${name}-form-item`;
  const isError = errors[name] && touched[name];
  const error = isError && errors[name];

  return (
    <div className={cn('space-y-2 mb-4', className)}>
      {label ? (
        <Label htmlFor={id} className={cn(error && 'text-destructive', className)}>
          {label}
        </Label>
      ) : null}

      <div className="relative flex">
        <div className="flex space-x-2 items-center">
          <Avatar>
            <AvatarImage src={user?.image || '/images/noavatar.png'}/>
          </Avatar>

          <div>{user?.name || 'Unknown'}</div>
        </div>
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

export default UserWithAvatarField;