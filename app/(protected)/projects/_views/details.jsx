'use client'
import {ProjectSchema} from "@/lib/form/validation";
import DetailsView from "@/components/Views/Detail";
import {useDetailsContext} from "@/components/Views/Detail/store/details-context";
import Fields from "@/app/(protected)/projects/_views/_components/fields";
import Actions from "@/app/(protected)/projects/_views/_components/actions";

export default function Details({pageTitle}) {
  const [{details}] = useDetailsContext()

  const initialValues = {
    title: details?.title || '',
    alias: details?.alias || '',
    description: details?.description || '',
    isDefault: details?.isDefault || false,
  }

  return (
    <DetailsView
      pageTitle={pageTitle}
      formTitle={details?.title}
      initialValues={initialValues}
      validationSchema={ProjectSchema}
      actions={<Actions/>}
    >
      <Fields/>
    </DetailsView>
  );
}