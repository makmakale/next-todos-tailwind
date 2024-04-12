import {Button} from "@/components/ui/button";
import {useRouter} from "next/navigation";
import {useFormikContext} from "formik";
import {setDetails, setError, toggleLoading} from "@/components/Views/Detail/store/actions";
import {useDetailsContext} from "@/components/Views/Detail/store/details-context";

const Actions = () => {
  const router = useRouter()
  const [{submitAction}, dispatch] = useDetailsContext()
  const {values, dirty, isValid} = useFormikContext();

  const handleSubmit = async (mode) => {
    dispatch(toggleLoading(true))
    const {data: actionData, error} = await submitAction(values)
    if (actionData) {
      dispatch(setDetails(actionData))
      if (mode === 'save&close') {
        router.replace('/tasks')
      } else {
        router.replace(`/tasks/edit/${actionData.id}`)
      }
    }
    if (error) {
      dispatch(setError(error))
    }
  }

  return (
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
        onClick={() => router.back()}
      >
        Cancel
      </Button>
    </>
  );
};

export default Actions;