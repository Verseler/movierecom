import NavLink from "./NavLink";
import AppLogo from "../ui/AppLogo";

export default function Footer() {
  return (
    <footer className="w-full pt-10 pb-24 border-t mt-14 md:py-14 border-neutral-800">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto space-y-10">
          <AppLogo />
          <ul className="flex flex-col items-center justify-center text-lg gap-7 md:flex-row md:gap-12">
            {NavLinks.map((link) => (
              <NavLink
                key={link.id}
                navPath={link.navPath}
                title={link.title}
              />
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}

const NavLinks = [
  { id: 1, title: "Home", navPath: "." },
  { id: 2, title: "Contact Us", navPath: null },
  { id: 3, title: "Terms Of Services", navPath: null },
  { id: 4, title: "Privacy Policy", navPath: null },
  { id: 5, title: "About Us", navPath: null },
];
