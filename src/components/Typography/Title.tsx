import { cn } from "@/lib/utils";

type TitleProps = {
  children: React.ReactNode;
  className?: React.HTMLProps<HTMLElement>["className"];
};

export default function Title({ children, className, ...props }: TitleProps) {
  return (
    <span
      className={cn(
        "block pb-2 text-4xl font-semibold tracking-tight text-white scroll-m-20 first:mt-0",
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
