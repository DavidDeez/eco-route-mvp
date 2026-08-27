import Sidebar from '@/components/Sidebar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col md:flex-row w-full">
      <Sidebar />
      <main className="flex-1 w-full overflow-y-auto mt-14 md:mt-0 pt-4 md:pt-0">
        {children}
      </main>
    </div>
  );
}
