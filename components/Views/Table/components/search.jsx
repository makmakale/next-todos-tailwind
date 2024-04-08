import {Input} from "@/components/ui/input";
import {Search as SearchIcon} from 'lucide-react'

const Search = ({value, onChange, placeholder}) => {
  return (
    <div className="relative my-4">
      <SearchIcon className="absolute left-2.5 top-3 h-4 w-4 text-muted-foreground"/>
      <Input
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
      />
    </div>
  );
};

export default Search;