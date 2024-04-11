'use client'
import {DetailsProvider} from "@/components/Views/Detail/store/details-context";
import {useParams} from "next/navigation";
import {createTask, getTaskById, updateTask} from "@/lib/actions/tasks";
import {TASK_CREATE_PAGE, TASK_EDIT_PAGE} from "@/lib/constants";

export default function FormLayout({children}) {
  const {id} = useParams()
  const editProps = {}
  let pageTitle = TASK_CREATE_PAGE

  if (id) {
    editProps.getData = () => getTaskById(id)
    pageTitle = TASK_EDIT_PAGE
  }

  const submitAction = id ? (values) => updateTask(values, id) : createTask

  return (
    <DetailsProvider pageTitle={pageTitle} {...editProps} submitAction={submitAction}>
      {children}
    </DetailsProvider>
  );
}