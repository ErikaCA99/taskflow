import NavBar from "@/components/navBar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <NavBar />
      <main className="bg-slate-950 min-h-screen" suppressHydrationWarning>
        {children}
      </main>
    </>
  );
}
