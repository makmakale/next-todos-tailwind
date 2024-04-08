'use client'
import {IsDefault} from "@/components/Views/Table/components/Columns/is-default";
import DeleteAction from "@/components/Views/Table/components/Columns/delete-action";
import TableView from "@/components/Views/Table";
import {deleteStatus, getListOfStatuses, setDefaultStatus} from "@/lib/actions/statuses";

export default function StatusesPage(props) {
  const columns = [
    {id: 'id', title: 'ID', className: 'w-[40px]', align: 'center'},
    {id: 'title', title: 'Title', link: '/projects/edit'},
    {id: 'description', title: 'Description'},
    {
      id: 'isDefault',
      title: 'Default',
      className: 'w-[80px]',
      align: 'center',
      renderValue: IsDefault,
    },
    {
      id: 'delete',
      title: '',
      className: 'w-[40px]',
      align: 'center',
      renderValue: DeleteAction
    },
  ]

  return <TableView
    title={"Statuses"}
    searchLabel={"Search status..."}
    columns={columns}
    getData={getListOfStatuses}
    setDefault={setDefaultStatus}
    onDelete={deleteStatus}
  />
}