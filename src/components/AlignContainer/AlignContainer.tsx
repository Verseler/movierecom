import { cn } from "@/lib/utils";

type AlignContainerProps = {
  className?: React.HTMLProps<HTMLElement>["className"];
  children: React.ReactNode;
};

/**
 * A container that aligns content to the right on medium and large screen sizes.
 * Its purpose is to prevent content to overlap with sidebar
 */
export default function AlignContainer({
  children,
  className,
  ...props
}: AlignContainerProps) {
  return (
    <div className={cn("ms-2 md:ms-20 lg:ms-28", className)} {...props}>
      {children}
    </div>
  );
}
