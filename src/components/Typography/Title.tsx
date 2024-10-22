import { cn } from "@/lib/utils";
import { motion, AnimationProps } from "framer-motion";

type TitleProps = AnimationProps & {
  children: React.ReactNode;
  className?: React.HTMLProps<HTMLElement>["className"];
};

export default function Title({ children, className, ...props }: TitleProps) {
  return (
    <motion.h1
      className={cn(
        "block pb-2 text-3xl line-clamp-2 md:text-4xl font-semibold tracking-tight text-white scroll-m-20 first:mt-0",
        className
      )}
      {...props}
    >
      {children}
    </motion.h1>
  );
}
