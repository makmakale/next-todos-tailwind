'use client'
import {DetailsProvider} from "@/components/Views/Detail/store/details-context";
import {useParams} from "next/navigation";
import {STATUS_CREATE_PAGE, STATUS_EDIT_PAGE} from "@/lib/constants";
import {createStatus, getStatusById, updateStatus} from "@/lib/actions/statuses";

export default function FormLayout({children}) {
  const {id} = useParams()
  const editProps = {}
  let pageTitle = STATUS_CREATE_PAGE

  if (id) {
    editProps.getData = () => getStatusById(id)
    pageTitle = STATUS_EDIT_PAGE
  }

  const submitAction = id ? (values) => updateStatus(values, id) : createStatus

  return (
    <DetailsProvider pageTitle={pageTitle} {...editProps} submitAction={submitAction}>
      {children}
    </DetailsProvider>
  );
}