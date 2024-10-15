import { Link } from "react-router-dom";
import Image from "../Image/Image";
import Logo from "@/assets/logo.png";

type AppLogoProps = {
  hideTitle?: boolean;
};

function AppLogo({ hideTitle = false }: AppLogoProps) {
  return (
    <Link to="." className="flex items-center justify-center gap-x-4">
      <Image src={Logo} alt="logo" className="size-10" />
      {!hideTitle && (
        <span aria-label="logo name" className="text-2xl font-semibold">
          MovieRecom
        </span>
      )}
    </Link>
  );
}

export default AppLogo;
