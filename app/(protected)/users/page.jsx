'use client'
import TableView from "@/components/Views/Table";
import {disableUser, getListOfUsers} from "@/lib/actions/users";
import Role from "@/components/Views/Table/components/Columns/role";
import DateColumn from "@/components/Views/Table/components/Columns/date";
import DisableAction from "@/components/Views/Table/components/Columns/disable-action";

export default function UsersPage(props) {
  const columns = [
    {id: 'id', title: 'ID', className: 'w-[40px]', align: 'center'},
    {id: 'image', title: 'Avatar', className: 'w-[60px]'},
    {id: 'name', title: 'Name', link: '/users/edit'},
    {id: 'username', title: 'Username'},
    {id: 'email', title: 'email'},
    {
      id: 'isAdmin',
      title: 'Role',
      className: 'w-[80px]',
      renderValue: Role
    },
    {id: 'createdAt', title: 'Registered', renderValue: DateColumn},
    {
      id: 'isActive',
      title: 'Status',
      className: 'w-[40px]',
      align: 'center',
      renderValue: DisableAction
    },
  ]

  return <TableView
    title={"Users"}
    searchLabel={"Search for user..."}
    columns={columns}
    getData={getListOfUsers}
    onDelete={disableUser}
  />
}