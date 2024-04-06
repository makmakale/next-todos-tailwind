import Link from "next/link";
import {AppName} from "@/lib/constants";
import getPackageVersion from "@/lib/getPackageVersion";

const Footer = () => {
  return (
    <footer
      className="border-t border-t-gray-300 dark:border-t-gray-800 py-1 px-3 flex justify-between items-center text-sm">
      <div>
        {AppName}
      </div>

      <div>
        &copy; 2024 Powered by:
        <Link href="https://makmakale.github.io/portfolio/" className="ml-1 hover:underline">MakMakAle</Link>
      </div>

      <div>
        ver. {getPackageVersion()}
      </div>
    </footer>
  );
};

export default Footer;