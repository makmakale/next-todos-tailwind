import {cn} from "@/lib/utils";
import * as React from "react";

const FormMessage = ({className, message, ...props}) => {
  if (!message) return null

  return (
    <p
      className={cn("text-sm font-medium text-destructive", className)}
      {...props}
    >
      {message}
    </p>
  );
};

export default FormMessage;