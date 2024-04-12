'use client'
import {IsDefault} from "@/components/Views/Table/components/Columns/is-default";
import DeleteAction from "@/components/Views/Table/components/Columns/delete-action";
import TableView from "@/components/Views/Table";
import {deleteStatus, getListOfStatuses, setDefaultStatus} from "@/lib/actions/statuses";
import {STATUS_LIST_PAGE} from "@/lib/constants";

export default function Table() {
  const columns = [
    {id: 'title', title: 'Title', link: '/statuses/edit'},
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
    {id: 'id', title: 'ID', className: 'w-[40px]'},
  ]

  return <TableView
    title={STATUS_LIST_PAGE}
    searchLabel={"Search for status..."}
    columns={columns}
    getData={getListOfStatuses}
    setDefault={setDefaultStatus}
    onDelete={deleteStatus}
  />
}