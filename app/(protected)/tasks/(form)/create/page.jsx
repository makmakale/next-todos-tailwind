import {getSessionUser} from "@/lib/utils/users";
import Details from "@/app/(protected)/tasks/_views/details";

export default async function CreatePage() {
  const user = await getSessionUser()

  return (
    <Details isCreateMode user={user}/>
  );
}