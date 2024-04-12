'use client'
import {DetailsProvider} from "@/components/Views/Detail/store/details-context";
import {useParams} from "next/navigation";
import {TYPE_CREATE_PAGE, TYPE_EDIT_PAGE} from "@/lib/constants";
import {createType, getTypeById, updateType} from "@/lib/actions/types";

export default function FormLayout({children}) {
  const {id} = useParams()
  const editProps = {}
  let pageTitle = TYPE_CREATE_PAGE

  if (id) {
    editProps.getData = () => getTypeById(id)
    pageTitle = TYPE_EDIT_PAGE
  }

  const submitAction = id ? (values) => updateType(values, id) : createType

  return (
    <DetailsProvider pageTitle={pageTitle} {...editProps} submitAction={submitAction}>
      {children}
    </DetailsProvider>
  );
}