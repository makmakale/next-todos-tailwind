'use client'
import {StatusSchema} from "@/lib/form/validation";
import DetailsView from "@/components/Views/Detail";
import {useDetailsContext} from "@/components/Views/Detail/store/details-context";
import Fields from "@/app/(protected)/statuses/_views/_components/fields";
import Actions from "@/app/(protected)/statuses/_views/_components/actions";

export default function Details({pageTitle}) {
  const [{details}] = useDetailsContext()

  const initialValues = {
    title: details?.title || '',
    description: details?.description || '',
    addTask: details?.addTask || false,
    isDefault: details?.isDefault || false,
  }

  return (
    <DetailsView
      pageTitle={pageTitle}
      formTitle={details?.title}
      initialValues={initialValues}
      validationSchema={StatusSchema}
      actions={<Actions/>}
    >
      <Fields/>
    </DetailsView>
  );
}