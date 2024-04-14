import Details from "@/components/pages/projects/Details";
import {redirect} from "next/navigation";
import {ROUTES} from "@/lib/utils/constants/routes";

export default async function Page({params}) {
  const [view, id] = params.options
  const route = ROUTES.projects

  if (view === 'create') {
    return <Details route={route}/>
  }

  if (view === 'edit' && !!id) {
    return <Details route={route} id={id}/>
  }

  redirect(route)
}