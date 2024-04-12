'use client'
import {DetailsProvider} from "@/components/Views/Detail/store/details-context";
import {useParams} from "next/navigation";
import {PRIORITY_CREATE_PAGE, PRIORITY_EDIT_PAGE} from "@/lib/constants";
import {createPriority, getPriorityById, updatePriority} from "@/lib/actions/priorities";

export default function FormLayout({children}) {
  const {id} = useParams()
  const editProps = {}
  let pageTitle = PRIORITY_CREATE_PAGE

  if (id) {
    editProps.getData = () => getPriorityById(id)
    pageTitle = PRIORITY_EDIT_PAGE
  }

  const submitAction = id ? (values) => updatePriority(values, id) : createPriority

  return (
    <DetailsProvider pageTitle={pageTitle} {...editProps} submitAction={submitAction}>
      {children}
    </DetailsProvider>
  );
}