type H2Props = React.HTMLAttributes<HTMLHeadingElement> & {
  children: React.ReactNode;
};

export default function H2({ children, ...props }: H2Props) {
  return (
    <h2
      className="text-2xl font-semibold tracking-tight text-white scroll-m-20"
      {...props}
    >
      {children}
    </h2>
  );
}
