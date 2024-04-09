'use client'
import TableView from "@/components/Views/Table";
import {IsDefault} from "@/components/Views/Table/components/Columns/is-default";
import DeleteAction from "@/components/Views/Table/components/Columns/delete-action";
import {deleteType, getListOfTypes, setDefaultType} from "@/lib/actions/types";
import {get} from "@/lib/utils/data";

export default function TypesPage() {
  const columns = [
    {id: 'id', title: 'ID', className: 'w-[40px]', align: 'center'},
    {id: 'title', title: 'Title', link: '/types/edit'},
    {id: 'alias', title: 'Alias'},
    {id: 'description', title: 'Description'},
    {
      id: 'color',
      title: 'Color',
      className: "w-[80px] text-center",
      renderValue: ({row, col}) => {
        return (
          <div
            className="w-[20px] h-[20px] border rounded-md mx-auto"
            style={{
              backgroundColor: get(row, col.id)
            }}/>
        )
      }
    },
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
    title={"Types"}
    searchLabel={"Search for types..."}
    columns={columns}
    getData={getListOfTypes}
    setDefault={setDefaultType}
    onDelete={deleteType}
  />
}