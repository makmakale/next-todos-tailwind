import {Badge} from "@/components/ui/badge";

export default function Role({row, col}) {
  return (
    <Badge variant="secondary">{row[col.id] ? 'Admin' : 'User'}</Badge>
  )
}