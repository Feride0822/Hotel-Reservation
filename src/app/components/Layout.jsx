import { Outlet, useLocation } from "react-router";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

export function Layout() {
  const location = useLocation();
  const hideNavbarFooter = ['/signin', '/register'].includes(location.pathname);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {!hideNavbarFooter && <Navbar />}
      <main className="flex-1">
        <Outlet />
      </main>
      {!hideNavbarFooter && <Footer />}
    </div>
  );
}
