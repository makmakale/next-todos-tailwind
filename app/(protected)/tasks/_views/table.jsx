'use client'
import TaskKey from "@/components/Views/Table/components/Columns/task-key";
import TaskTitleColumn from "@/components/Views/Table/components/Columns/task-title";
import PriorityColumn from "@/components/Views/Table/components/Columns/priority";
import DateColumn from "@/components/Views/Table/components/Columns/date";
import DeleteAction from "@/components/Views/Table/components/Columns/delete-action";
import {TASK_LIST_PAGE} from "@/lib/constants";
import {deleteTask, getListOfTasks} from "@/lib/actions/tasks";
import TableView from '@/components/Views/Table';

const Table = () => {
  const columns = [
    {
      id: 'id',
      title: 'Task',
      className: 'w-[100px]',
      renderValue: TaskKey,
    },
    {id: 'title', title: 'Title', link: '/tasks/edit', renderValue: TaskTitleColumn},
    {id: 'status.title', title: 'Status'},
    {id: 'priority.title', title: 'Priority', renderValue: PriorityColumn},
    {id: 'assignee.name', title: 'Assignee'},
    {id: 'createdAt', title: 'Created Date', renderValue: DateColumn},
    {id: 'reporter.name', title: 'Reported'},
    {
      id: 'delete',
      title: '',
      className: 'w-[40px]',
      align: 'center',
      renderValue: DeleteAction,
    },
  ];

  return (
    <TableView
      title={TASK_LIST_PAGE}
      searchLabel={'Search for task...'}
      columns={columns}
      getData={getListOfTasks}
      onDelete={deleteTask}
    />
  );
};

export default Table;