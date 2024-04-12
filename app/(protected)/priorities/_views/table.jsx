'use client'
import {IsDefault} from "@/components/Views/Table/components/Columns/is-default";
import DeleteAction from "@/components/Views/Table/components/Columns/delete-action";
import TableView from "@/components/Views/Table";
import {ColorColumn} from "@/components/Views/Table/components/Columns/color";
import {deletePriority, getListOfPriorities, setDefaultPriority} from "@/lib/actions/priorities";
import {PRIORITY_LIST_PAGE} from "@/lib/constants";

export default function Table() {
  const columns = [
    {id: 'title', title: 'Title', link: '/priorities/edit'},
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
    title={PRIORITY_LIST_PAGE}
    searchLabel={"Search for priorities..."}
    columns={columns}
    getData={getListOfPriorities}
    setDefault={setDefaultPriority}
    onDelete={deletePriority}
  />
}