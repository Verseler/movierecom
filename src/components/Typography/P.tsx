import { cn } from "@/lib/utils";

type PProps = React.HTMLAttributes<HTMLParagraphElement> & {
  children: React.ReactNode;
};

export default function P({ className, children, ...props }: PProps) {
  return (
    <p
      className={cn("leading-7 [&:not(:first-child)]:mt-6", className)}
      {...props}
    >
      {children}
    </p>
  );
}
