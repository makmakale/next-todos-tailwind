import Image from "next/image";
import {CardDescription, CardHeader, CardTitle} from "@/components/ui/card";

const Header = ({headerLabel}) => {
  return (
    <CardHeader>
      <div className="flex justify-center items-center gap-3">
        <Image src="/images/auth.png" alt='Auth' width={80} height={80}/>
        <div className="flex flex-col space-y-1">
          <CardTitle className="text-5xl">Auth</CardTitle>
          <CardDescription>{headerLabel}</CardDescription>
        </div>
      </div>
    </CardHeader>
  );
};

export default Header;