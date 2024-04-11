'use client'
import {TaskSchema} from "@/lib/form/validation";
import DetailsView from "@/components/Views/Detail";
import {useRouter} from "next/navigation";
import {useDetailsContext} from "@/components/Views/Detail/store/details-context";
import {setDetails, setError} from "@/components/Views/Detail/store/actions";
import Fields from "@/app/(protected)/tasks/(form)/_components/fields";

export default function Details({isCreateMode, pageTitle, user}) {
  const router = useRouter()
  const [{details, submitAction}, dispatch] = useDetailsContext()

  const initialValues = {
    title: details?.title || '',
    projectId: details?.projectId || '',
    description: details?.description || '',
    statusId: details?.statusId || '',
    userId: details?.userId || '',
    typeId: details?.typeId || '',
    priorityId: details?.priorityId || '',
    createdBy: isCreateMode ? user.id : details?.createdBy
  }

  const onSubmit = async (values) => {
    const {data: actionData, error} = await submitAction(values)
    if (actionData) {
      dispatch(setDetails(actionData))
      router.replace('/tasks')
    }
    if (error) {
      dispatch(setError(error))
    }
  }

  return (
    <DetailsView
      pageTitle={pageTitle}
      formTitle={details?.title}
      initialValues={initialValues}
      validationSchema={TaskSchema}
      onSubmit={onSubmit}
    >
      <Fields user={isCreateMode ? user : details?.author}/>
    </DetailsView>
  );
}