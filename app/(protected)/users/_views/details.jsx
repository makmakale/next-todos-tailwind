'use client'
import {RegisterSchema, UpdateUserSchema} from "@/lib/form/validation";
import DetailsView from "@/components/Views/Detail";
import {useDetailsContext} from "@/components/Views/Detail/store/details-context";
import Fields from "@/app/(protected)/users/_views/_components/fields";
import Actions from "@/app/(protected)/users/_views/_components/actions";

export default function Details({pageTitle, isCreateMode}) {
  const [{details}] = useDetailsContext()

  const initialValues = {
    username: details?.username || '',
    name: details?.name || '',
    email: details?.email || '',
    password: '',
    isActive: details?.isActive || true,
  }

  return (
    <DetailsView
      pageTitle={pageTitle}
      formTitle={details?.title}
      initialValues={initialValues}
      validationSchema={isCreateMode ? RegisterSchema : UpdateUserSchema}
      actions={<Actions path="/users"/>}
    >
      <Fields isCreateMode={isCreateMode}/>
    </DetailsView>
  );
}