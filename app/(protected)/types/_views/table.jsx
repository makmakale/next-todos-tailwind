'use client'
import {IsDefault} from "@/components/Views/Table/components/Columns/is-default";
import DeleteAction from "@/components/Views/Table/components/Columns/delete-action";
import TableView from "@/components/Views/Table";
import {deleteType, getListOfTypes, setDefaultType} from "@/lib/actions/types";
import {TYPE_LIST_PAGE} from "@/lib/constants";
import {ColorColumn} from "@/components/Views/Table/components/Columns/color";

export default function Table() {
  const columns = [
    {id: 'title', title: 'Title', link: '/types/edit'},
    {id: 'alias', title: 'Alias'},
    {id: 'description', title: 'Description'},
    {
      id: 'color',
      title: 'Color',
      className: "w-[80px] text-center",
      renderValue: ColorColumn
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
    title={TYPE_LIST_PAGE}
    searchLabel={"Search for types..."}
    columns={columns}
    getData={getListOfTypes}
    setDefault={setDefaultType}
    onDelete={deleteType}
  />
}