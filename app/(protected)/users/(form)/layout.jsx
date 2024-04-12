'use client'
import {DetailsProvider} from "@/components/Views/Detail/store/details-context";
import {useParams} from "next/navigation";
import {USER_CREATE_PAGE, USER_EDIT_PAGE} from "@/lib/constants";
import {createUser, getUserById, updateUser} from "@/lib/actions/users";

export default function FormLayout({children}) {
  const {id} = useParams()
  const editProps = {}
  let pageTitle = USER_CREATE_PAGE

  if (id) {
    editProps.getData = () => getUserById(id)
    pageTitle = USER_EDIT_PAGE
  }

  const submitAction = id ? (values) => updateUser(values, id) : createUser

  return (
    <DetailsProvider pageTitle={pageTitle} {...editProps} submitAction={submitAction}>
      {children}
    </DetailsProvider>
  );
}