import { Link } from "react-router-dom";
import Image from "../Image/Image";
import Logo from "@/assets/logo.png";
import { cn } from "@/lib/utils";

type AppLogoProps = {
  hideTitle?: boolean;
  className?: React.HTMLAttributes<HTMLElement>["className"];
};

function AppLogo({ hideTitle = false, className }: AppLogoProps) {
  return (
    <Link
      to="."
      className={cn("flex items-center justify-center gap-x-4", className)}
    >
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
