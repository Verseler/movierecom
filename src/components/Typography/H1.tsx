type H1Props = React.HTMLAttributes<HTMLHeadingElement> & {
  children: React.ReactNode;
};

export default function H1({ children, ...props }: H1Props) {
  return (
    <h1
      className="text-3xl font-bold tracking-tight scroll-m-20 lg:text-4xl"
      {...props}
    >
      {children}
    </h1>
  );
}
