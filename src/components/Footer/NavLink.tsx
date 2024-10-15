import { Link } from "react-router-dom";

type NavLinkProps = {
  navPath: string | null;
  title: string;
};

export default function NavLink({ navPath, title }: NavLinkProps) {
  if (navPath) {
    return (
      <li>
        <Link to={navPath} className="text-white hover:text-neutral-200">
          {title}
        </Link>
      </li>
    );
  }

  return (
    <li>
      <span className="text-neutral-400">{title}</span>
    </li>
  );
}
