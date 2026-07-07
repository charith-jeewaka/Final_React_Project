import { Outlet } from "react-router-dom";
import UserNavbar from "../components/user/UserNavbar";

const UserLayout = () => {
  return (
    <div className="flex h-screen flex-col bg-zinc-100">
      {/* Fixed Navbar */}
      <div className="shrink-0">
        <UserNavbar />
      </div>

      {/* Scrollable Content */}
      <main className="flex-1 overflow-y-auto p-6 pt-3">
        <Outlet />
      </main>
    </div>
  );
};

export default UserLayout;
