import { ReactNode } from "react";
import { Link } from "react-router-dom";

interface NavComponentProps {
  icon: ReactNode;
  name: string;
  link: string;
}

export const NavComponent: React.FC<NavComponentProps> = ({
  icon,
  name,
  link,
}) => {
  return (
    <li className="mb-2">
  <Link className="flex text-2xl items-center p-4 gap-x-4 space-x-4 dark:hover:text-yellow-400 hover:text-blue-700 hover:bg-gray-100 dark:hover:bg-black/30 transition-colors duration-200 " to={link}>
    <div className="flex text-3xl text-blue-700 dark:text-yellow-400 items-center justify-center font-medium ">
      {icon}
    </div>
    <div className=" font-medium">{name}</div>
  </Link>
</li>

  );
};
