import {Button} from "@/components/ui/button";
import {useRouter} from "next/navigation";
import {useFormikContext} from "formik";
import {setDetails, setError} from "@/components/Views/Detail/store/actions";
import {useDetailsContext} from "@/components/Views/Detail/store/details-context";
import {useTransition} from "react";
import {Loader2} from "lucide-react";

const Actions = () => {
  const router = useRouter()
  const [{submitAction}, dispatch] = useDetailsContext()
  const {values, dirty, isValid, resetForm} = useFormikContext();
  const [isLoading, setTransition] = useTransition()

  const handleSubmit = (mode) => {
    setTransition(async () => {
      const {data: actionData, error} = await submitAction(values)
      if (actionData) {
        if (mode === 'save&close') {
          router.replace('/statuses')
        } else {
          dispatch(setDetails(actionData))
          router.replace(`/statuses/edit/${actionData.id}`)
        }
      }
      if (error) {
        dispatch(setError(error))
      }
    })
  }

  return (
    isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/> :
      <>
        <Button
          key={'save'}
          type="button"
          className="bg-green-500"
          disabled={!dirty || !isValid}
          onClick={() => handleSubmit('save')}
        >
          Save
        </Button>

        <Button
          key={'save&close'}
          type="button"
          variant="outline"
          className="text-green-500 border-green-500"
          disabled={!dirty || !isValid}
          onClick={() => handleSubmit('save&close')}
        >
          Save & Close
        </Button>

        <Button
          key={'cancelBtn'}
          type="button"
          variant="outline"
          onClick={() => {
            resetForm()
            router.back()
          }}
        >
          Cancel
        </Button>
      </>
  );
};

export default Actions;