import {Badge} from "@/components/ui/badge";
import {get} from "@/lib/data";

export default function Role({row, col}) {
  return (
    <Badge variant="secondary">{get(row, col.id) ? 'Admin' : 'User'}</Badge>
  )
}