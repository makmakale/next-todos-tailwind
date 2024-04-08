'use client'
import TableView from "@/components/Views/Table";
import {deleteProject, getListOfProjects, setDefaultProject} from "@/lib/actions/projects";
import {IsDefault} from "@/components/Views/Table/components/Columns/is-default";
import DeleteAction from "@/components/Views/Table/components/Columns/delete-action";

export default function ProjectsPage() {
  const columns = [
    {id: 'id', title: 'ID', className: 'w-[40px]', align: 'center'},
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
    title={"Projects"}
    searchLabel={"Search projects..."}
    columns={columns}
    getData={getListOfProjects}
    setDefault={setDefaultProject}
    onDelete={deleteProject}
  />
}