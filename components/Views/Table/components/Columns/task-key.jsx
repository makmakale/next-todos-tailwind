import {get} from "@/lib/data";

const TaskKey = ({row, col}) => {
  const projectAlias = get(row, 'project.alias')
  const taskId = get(row, col.id)

  if (!projectAlias || !taskId) return '???'

  return (
    <div>{projectAlias}&mdash;{taskId}</div>
  )
}

export default TaskKey