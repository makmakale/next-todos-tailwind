import Table from "@/app/(protected)/users/_views/table";
import {getSessionUser} from "@/lib/utils/users";

export default async function UsersPage() {
  const user = await getSessionUser()

  return <Table user={user}/>
}