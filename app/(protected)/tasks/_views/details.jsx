'use client'
import {TaskSchema} from "@/lib/form/validation";
import DetailsView from "@/components/Views/Detail";
import {useDetailsContext} from "@/components/Views/Detail/store/details-context";
import Fields from "@/app/(protected)/tasks/(form)/_components/fields";
import Actions from "@/app/(protected)/tasks/(form)/_components/actions";

export default function Details({isCreateMode, pageTitle, user}) {
  const [{details}] = useDetailsContext()

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

  return (
    <DetailsView
      pageTitle={pageTitle}
      formTitle={details?.title}
      initialValues={initialValues}
      validationSchema={TaskSchema}
      actions={<Actions/>}
    >
      <Fields user={isCreateMode ? user : details?.reporter}/>
    </DetailsView>
  );
}