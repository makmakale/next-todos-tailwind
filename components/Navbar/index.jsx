import {AppName} from "@/lib/constants";
import Link from "next/link";
import {ModeToggle} from "@/components/ModeToggle";
import UserMenu from "@/components/Navbar/UserMenu";
import {currentUser} from "@/lib/users";
import {Button} from "@/components/ui/button";

export default async function Navbar() {
  const user = await currentUser()

  return (
    <header className="border-b border-b-gray-300 dark:border-b-gray-800 p-4 flex items-center">
      <h1 className="font-bold hidden sm:block">
        <Link href="/">{AppName}</Link>
      </h1>

      <div className="ml-auto flex gap-4">
        <ModeToggle/>
        {user
          ? <UserMenu user={user}/>
          : (
            <Button asChild>
              <Link href={"/auth/login"}>Sign In</Link>
            </Button>
          )}
      </div>
    </header>
  );
};