import { createBrowserRouter } from "react-router";
import { LanguageProvider } from "../i18n/LanguageContext";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { SearchResults } from "./pages/SearchResults";
import { HotelDetail } from "./pages/HotelDetail";
import { Booking } from "./pages/Booking";
import { BookingSuccess } from "./pages/BookingSuccess";
import { SignIn } from "./pages/SignIn";
import { Register } from "./pages/Register";
import { UserDashboard } from "./pages/UserDashboard";
import { AdminDashboard } from "./pages/AdminDashboard";

// Root component that wraps everything with LanguageProvider
function RootLayout({ children }) {
  return <LanguageProvider>{children}</LanguageProvider>;
}

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <RootLayout>
        <Layout />
      </RootLayout>
    ),
    children: [
      { index: true, Component: Home },
      { path: "search", Component: SearchResults },
      { path: "hotel/:id", Component: HotelDetail },
      { path: "booking/:id", Component: Booking },
      { path: "booking-success", Component: BookingSuccess },
      { path: "dashboard", Component: UserDashboard },
      { path: "admin", Component: AdminDashboard },
    ],
  },
  {
    path: "/signin",
    element: (
      <RootLayout>
        <SignIn />
      </RootLayout>
    ),
  },
  {
    path: "/register",
    element: (
      <RootLayout>
        <Register />
      </RootLayout>
    ),
  },
]);