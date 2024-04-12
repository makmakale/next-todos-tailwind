'use client'
import DetailsView from "@/components/Views/Detail";
import {useDetailsContext} from "@/components/Views/Detail/store/details-context";
import Fields from "@/app/(protected)/priorities/_views/_components/fields";
import Actions from "@/app/(protected)/priorities/_views/_components/actions";
import {TaskPrioritySchema} from "@/lib/form/validation";

export default function Details({pageTitle}) {
  const [{details}] = useDetailsContext()

  const initialValues = {
    title: details?.title || '',
    alias: details?.alias || '',
    description: details?.description || '',
    color: details?.color || '#3192e7',
    isDefault: details?.isDefault || false,
  }

  return (
    <DetailsView
      pageTitle={pageTitle}
      formTitle={details?.title}
      initialValues={initialValues}
      validationSchema={TaskPrioritySchema}
      actions={<Actions path="/priorities"/>}
    >
      <Fields/>
    </DetailsView>
  );
}