import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { Sidebar } from "./Sidebar";
import SessionProvider from "./SessionProvider";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  return (
    <SessionProvider session={session}>
      <div style={{ display: "flex", minHeight: "100vh", background: "var(--bg-base)" }}>
        <Sidebar />
        <main
          style={{
            flex: 1,
            marginLeft: "240px",
            minHeight: "100vh",
            overflowY: "auto",
          }}
        >
          {children}
        </main>
      </div>
    </SessionProvider>
  );
}
