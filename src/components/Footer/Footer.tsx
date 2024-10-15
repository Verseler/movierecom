import { Link } from "react-router-dom";
import Image from "../Image/Image";
import Logo from "@/assets/logo.png";

export default function Footer() {
  return (
    <footer className="w-full pt-10 pb-24 border-t mt-14 md:py-14 border-neutral-800">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto space-y-10">
          <Link to="." className="flex items-center justify-center gap-x-4">
            <Image src={Logo} alt="logo" className="size-10" />
            <span aria-label="logo name" className="text-2xl font-semibold">
              MovieRecom
            </span>
          </Link>

          <ul className="flex flex-col items-center justify-center text-lg gap-7 md:flex-row md:gap-12">
            {NavLinks.map((link) => (
              <li key={link.id}>
                <Link
                  to={link.navPath}
                  className="text-white hover:text-neutral-300"
                >
                  {link.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}

const NavLinks = [
  { id: 1, title: "Home", navPath: "." },
  { id: 2, title: "Contact Us", navPath: "." },
  { id: 3, title: "Terms Of Services", navPath: "." },
  { id: 4, title: "Privacy Policy", navPath: "." },
  { id: 5, title: "About Us", navPath: "." },
];
