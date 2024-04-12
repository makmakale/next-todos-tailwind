'use client'
import Form from '@/components/Formik/Form';
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from '@/components/ui/card';
import {Button} from '@/components/ui/button';
import {useRouter} from "next/navigation";
import FormMessage from "@/components/ui/form-message";
import {useDetailsContext} from "@/components/Views/Detail/store/details-context";
import {clearMessages} from "@/components/Views/Detail/store/actions";
import {Loader2} from "lucide-react";

const DetailsView = ({
  initialValues,
  validationSchema,
  onSubmit,
  formTitle,
  actions,
  children,
}) => {
  const router = useRouter()
  const [{isLoading, error, success}, dispatch] = useDetailsContext()

  if (isLoading) return <Loader2 className="mr-2 h-4 w-4 animate-spin"/>

  return (
    <Form
      enableReinitialize
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      <FormMessage
        variant={success ? 'success' : 'error'}
        message={success || error}
        onClose={() => dispatch(clearMessages())}
      />

      <div className="w-full flex space-x-2">
        <Card className="flex-grow-[4]">
          <CardHeader>
            {!!formTitle && <CardTitle>{formTitle}</CardTitle>}
          </CardHeader>

          <CardContent>
            {children}
          </CardContent>

          <CardFooter className="space-x-2">
            {actions ? actions : (
              <>
                <Button type="button" variant="outline" onClick={() => router.back()}>Cancel</Button>
                <Button type="submit">Submit</Button>
              </>
            )}
          </CardFooter>
        </Card>
      </div>
    </Form>
  );
};

export default DetailsView;