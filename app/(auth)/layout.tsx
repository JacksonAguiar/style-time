export const metadata = {
  title: "Style Time",
  description: "Page description",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main className="grow">{children}</main>;
}
