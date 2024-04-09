import {get} from "@/lib/utils/data";
import {Badge} from "@/components/ui/badge";
import Link from "next/link";
import {Button} from "@/components/ui/button";

const TaskTitle = ({row, col}) => {
  const label = get(row, 'type.title')
  const taskTitle = get(row, col.id)

  if (!taskTitle) return '???'

  return (
    <div className="space-x-2">
      {label && <Badge variant="outline">{label}</Badge>}
      <Button variant="link" asChild className="px-0">
        <Link href={`${col.link}/${row.id}`} className="max-w-[500px] truncate font-medium">
          {taskTitle}
        </Link>
      </Button>
    </div>
  )
}

export default TaskTitle