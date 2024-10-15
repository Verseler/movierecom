import { cn } from "@/lib/utils";

type H1Props = React.HTMLAttributes<HTMLHeadingElement> & {
  children: React.ReactNode;
  className?: React.HtmlHTMLAttributes<HTMLElement>["className"];
};

export default function H1({ children, className, ...props }: H1Props) {
  return (
    <h1
      className={cn(
        "text-3xl font-bold tracking-tight scroll-m-20 lg:text-4xl",
        className
      )}
      {...props}
    >
      {children}
    </h1>
  );
}
