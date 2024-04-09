'use client'

import {Input} from "@/components/ui/input";
import {CirclePlus, Search as SearchIcon} from 'lucide-react'
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {usePathname} from "next/navigation";

const Search = ({value, onChange, placeholder = "Type for search"}) => {
  const pathname = usePathname()

  return (
    <div className="relative my-4 flex">
      <SearchIcon className="absolute left-2.5 top-3 h-4 w-4 text-muted-foreground"/>
      <Input
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
      />

      <Button asChild className="ml-auto">
        <Link href={`${pathname}/create`}>
          <CirclePlus className="w-4 h-4 mr-2"/> New
        </Link>
      </Button>
    </div>
  );
};

export default Search;