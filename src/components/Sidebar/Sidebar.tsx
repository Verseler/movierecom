import { Link } from "react-router-dom";
import Image from "../Image/Image";
import AppLogo from "@/assets/logo.png";
import NavItem from "./NavItem";

const FILM_NAV_LINKS = [
  { id: 1, icon: "home", navPath: "." },
  { id: 2, icon: "movie", navPath: "movies" },
  { id: 3, icon: "live_tv", navPath: "tv-shows" },
];

export default function Sidebar() {
  const mainNavLinks = FILM_NAV_LINKS.map((link) => (
    <NavItem key={link.id} navPath={link.navPath} icon={link.icon} />
  ));

  return (
    <nav className="fixed bottom-0 z-50 flex flex-col items-center bg-neutral-800 md:bg-transparent justify-between w-full md:h-full md:w-20 lg:w-28 py-1.5 md:ps-4 md:py-10">
      <Link to="." className="hidden md:block">
        <Image src={AppLogo} alt="App Logo" className="size-10" />
      </Link>
      <div className="flex items-center justify-center flex-grow gap-10 md:flex-col">
        {mainNavLinks}
      </div>
    </nav>
  );
}
