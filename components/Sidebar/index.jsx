import Link from "next/link";
import {BoardIcon, PrioritiesIcon, ProjectsIcon, StatusesIcon, TypesIcon, UsersIcon} from "@/components/Icons";

const menuItems = [
  {
    group: "Board",
    items: [
      {
        link: '/',
        text: 'Board',
        icon: BoardIcon
      },
      {
        link: '/projects',
        text: 'Projects',
        icon: ProjectsIcon
      },
      {
        link: '/users',
        text: 'Users',
        icon: UsersIcon
      },
    ],
  },
  {
    group: "Settings",
    items: [

      {
        link: '/statuses',
        text: 'Statuses',
        icon: StatusesIcon
      },
      {
        link: '/types',
        text: 'Types',
        icon: TypesIcon
      },
      {
        link: '/priorities',
        text: 'Priorities',
        icon: PrioritiesIcon
      },
    ]
  }
]

const Sidebar = () => {
  return (
    <div>
      {menuItems.map((menu, key) => {
        if (menu.group) {
          return (
            <>
              <h2 className="my-2 px-2 text-lg font-semibold tracking-tight">
                {menu.group}
              </h2>
              <ul>
                {menu.items.map((option, optionKey) =>
                  <MenuItem key={optionKey} item={option}/>
                )}
              </ul>
            </>
          )
        }

        return <MenuItem key={key} item={menu}/>
      })}
    </div>
  );
};

function MenuItem({item}) {
  const Icon = item.icon

  return (
    <li className="flex items-center hover:bg-gray-100 dark:hover:bg-gray-700">
      <Link className="w-full flex items-center space-x-4 px-6 py-4" href={item.link}>
        {Icon && <Icon className="h-5 w-5 text-gray-500 dark:text-gray-400"/>}
        <span className="text-sm font-medium">{item.text}</span>
      </Link>
    </li>
  )
}

export default Sidebar;