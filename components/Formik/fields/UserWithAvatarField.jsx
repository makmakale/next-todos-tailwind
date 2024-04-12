'use client';

import {Avatar, AvatarImage} from "@/components/ui/avatar";
import FormControl from "@/components/Formik/common/FormControl";
import FormLabel from "@/components/Formik/common/FormLabel";
import FormHelperText from "@/components/Formik/common/FormHelperText";

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
  const error = errors[name];

  return (
    <FormControl className={className}>
      <FormLabel label={label} id={id} isError={isError}/>

      <div className="relative flex">
        <div className="flex space-x-2 items-center">
          <Avatar>
            <AvatarImage id={id} src={user?.image || '/images/noavatar.png'}/>
          </Avatar>

          <div>{user?.name || 'Unknown'}</div>
        </div>
      </div>

      <FormHelperText show={isError || helperText} isError={isError}>
        {error || helperText}
      </FormHelperText>
    </FormControl>
  );
};

export default UserWithAvatarField;