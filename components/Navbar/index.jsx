import {AppName} from "@/lib/constants";
import Link from "next/link";
import {ModeToggle} from "@/components/ModeToggle";

const Navbar = () => {
  return (
    <header className="border-b border-b-gray-300 dark:border-b-gray-800 p-4 flex items-center">
      <h1 className="font-bold hidden sm:block">
        <Link href="/">{AppName}</Link>
      </h1>

      <div className="ml-auto">
        <ModeToggle/>
      </div>

      <div>
        LoggedUser, LogOut
      </div>
    </header>
  );
};

export default Navbar;