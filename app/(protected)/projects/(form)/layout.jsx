'use client'
import {DetailsProvider} from "@/components/Views/Detail/store/details-context";
import {useParams} from "next/navigation";
import {PROJECT_CREATE_PAGE, PROJECT_EDIT_PAGE} from "@/lib/constants";
import {createProject, getProjectById, updateProject} from "@/lib/actions/projects";

export default function FormLayout({children}) {
  const {id} = useParams()
  const editProps = {}
  let pageTitle = PROJECT_CREATE_PAGE

  if (id) {
    editProps.getData = () => getProjectById(id)
    pageTitle = PROJECT_EDIT_PAGE
  }

  const submitAction = id ? (values) => updateProject(values, id) : createProject

  return (
    <DetailsProvider pageTitle={pageTitle} {...editProps} submitAction={submitAction}>
      {children}
    </DetailsProvider>
  );
}