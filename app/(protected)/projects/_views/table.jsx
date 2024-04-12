'use client'
import {IsDefault} from "@/components/Views/Table/components/Columns/is-default";
import DeleteAction from "@/components/Views/Table/components/Columns/delete-action";
import TableView from "@/components/Views/Table";
import {deleteProject, getListOfProjects, setDefaultProject} from "@/lib/actions/projects";
import {PROJECT_LIST_PAGE} from "@/lib/constants";

export default function Table() {
  const columns = [
    {id: 'title', title: 'Title', link: '/projects/edit'},
    {id: 'alias', title: 'Alias'},
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
    title={PROJECT_LIST_PAGE}
    searchLabel={"Search for projects..."}
    columns={columns}
    getData={getListOfProjects}
    setDefault={setDefaultProject}
    onDelete={deleteProject}
  />
}