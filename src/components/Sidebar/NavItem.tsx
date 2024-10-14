import { NavLink } from "react-router-dom";

type NavItemProps = {
  navPath: string;
  icon: string;
  className?: React.HTMLProps<HTMLAnchorElement>["className"];
};

export default function NavItem({ navPath, icon, className }: NavItemProps) {
  return (
    <NavLink
      to={navPath}
      style={({ isActive }) =>
        isActive ? { color: "#ef4444" } : { color: "#a3a3a3" }
      }
      className={className}
    >
      <span className="text-3xl transition-all select-none md:text-2xl hover:opacity-80 material-symbols-outlined">
        {icon}
      </span>
    </NavLink>
  );
}
