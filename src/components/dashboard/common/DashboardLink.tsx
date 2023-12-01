import Link from "next/link";
import { usePathname } from "next/navigation";
import { HTMLAttributes } from "react";

interface IDashboardLink extends HTMLAttributes<HTMLAnchorElement> {
  children: string;
  to: string;
}

const DashboardLink = ({
  children,
  to,
  ...props
}: IDashboardLink): JSX.Element => {
  const path = usePathname();

  return (
    <Link
      href={to}
      className={`h-[35px] w-[100px] text-center text-n-md text-n-light-black ${
        to.includes(path) && "border-b-[5px] border-n-light-black"
      }`}
      scroll={false}
      {...props}
    >
      {children}
    </Link>
  );
};

export default DashboardLink;
