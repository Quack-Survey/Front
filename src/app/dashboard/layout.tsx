import GlobalNavigation from "@/components/GlobalNavigation";
import DashboardNavigation from "@/components/dashboard/DashboardNavigation";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <div>
      <DashboardNavigation></DashboardNavigation>
      <div className="m-auto min-h-[620px] w-[360px]">{children}</div>
      <GlobalNavigation />
    </div>
  );
}
