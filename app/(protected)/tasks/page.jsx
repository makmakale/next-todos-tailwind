'use client'
import TableView from '@/components/Views/Table'
import {deleteTask, getListOfTasks} from '@/lib/actions/tasks'
import DeleteAction from '@/components/Views/Table/components/Columns/delete-action'
import DateColumn from "@/components/Views/Table/components/Columns/date";
import TaskKey from "@/components/Views/Table/components/Columns/task-key";
import TaskTitle from "@/components/Views/Table/components/Columns/task-title";

export default function TasksPage() {
  const columns = [
    {
      id: 'id',
      title: 'Task',
      className: 'w-[100px]',
      renderValue: TaskKey
    },
    {id: 'title', title: 'Title', link: '/tasks/edit', renderValue: TaskTitle},
    {id: 'status.title', title: 'Status'},
    {id: 'priority.title', title: 'Priority'},
    {id: 'assignee.name', title: 'Assignee'},
    {id: 'createdAt', title: 'Created Date', renderValue: DateColumn},
    {
      id: 'delete',
      title: '',
      className: 'w-[40px]',
      align: 'center',
      renderValue: DeleteAction,
    },
  ]

  return (
    <TableView
      title={'Tasks'}
      searchLabel={'Search for task...'}
      columns={columns}
      getData={getListOfTasks}
      onDelete={deleteTask}
    />
  )
}
