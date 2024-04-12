'use client'
import TableView from "@/components/Views/Table";
import {USER_LIST_PAGE} from "@/lib/constants";
import {disableUser, getListOfUsers} from "@/lib/actions/users";
import Role from "@/components/Views/Table/components/Columns/role";
import DateColumn from "@/components/Views/Table/components/Columns/date";
import DisableAction from "@/components/Views/Table/components/Columns/disable-action";
import AvatarColumn from "@/components/Views/Table/components/Columns/avatar";

export default function Table({user}) {
  const columns = [
    {
      id: 'image',
      title: 'Avatar',
      className: 'w-[60px]',
      renderValue: AvatarColumn
    },
    {id: 'name', title: 'Name', link: '/users/edit'},
    {id: 'username', title: 'Username'},
    {id: 'email', title: 'email'},
    {
      id: 'isAdmin',
      title: 'Role',
      className: 'w-[80px]',
      renderValue: Role
    },
    {
      id: 'createdAt',
      title: 'Registered',
      className: 'min-w-[150px]',
      renderValue: DateColumn
    },
    {
      id: 'isActive',
      title: 'Status',
      className: 'w-[40px]',
      align: 'center',
      renderValue: (colProps) => <DisableAction {...colProps} loggedUser={user}/>
    },
  ]

  return <TableView
    title={USER_LIST_PAGE}
    searchLabel={"Search for users..."}
    columns={columns}
    getData={getListOfUsers}
    onDelete={disableUser}
  />
}