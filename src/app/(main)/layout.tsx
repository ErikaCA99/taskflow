export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <main className="bg-slate-950 min-h-screen" suppressHydrationWarning>
        {children}
      </main>
    </>
  );
}
