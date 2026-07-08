import { NavLink } from "react-router-dom";
import LogoutButton from "../common/LogoutButton";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Boxes,
  BarChart3,
  Mail,
  CircleUserRound,
} from "lucide-react";

const AdminNavbar = () => {
  const menuItems = [
    {
      name: "Dashboard",
      path: "/admin",
      icon: LayoutDashboard,
    },
    {
      name: "Products",
      path: "/admin/addProducts",
      icon: Package,
    },
    {
      name: "Orders",
      path: "/admin/orders",
      icon: ShoppingCart,
    },
    {
      name: "Inventory",
      path: "/admin/inventory",
      icon: Boxes,
    },
    {
      name: "Reports",
      path: "/admin/reports",
      icon: BarChart3,
    },
    {
      name: "Emails",
      path: "/admin/emails",
      icon: Mail,
    },
  ];

  return (
    <aside className="w-72 bg-zinc-950 text-white shadow-2xl flex flex-col">
      {/* Logo */}

      <div className="border-b border-zinc-800 px-8 py-7">
        <div className="flex items-center justify-center gap-4">
          <CircleUserRound size={60} className="text-emerald-400" />

          <div>
            <h1 className="text-3xl font-black text-emerald-400">EzShop</h1>

            <p className="mt-1 text-sm text-zinc-400">Admin Dashboard</p>
          </div>
        </div>
      </div>

      {/* Menu */}

      <nav className="flex-1 overflow-y-auto p-5 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.path === "/admin"}
              className={({ isActive }) =>
                `group flex items-center gap-3 rounded-xl px-5 py-3 transition-all duration-300
        ${
          isActive
            ? "bg-emerald-500 text-black font-semibold shadow-lg"
            : "text-zinc-300 hover:bg-zinc-900 hover:text-white"
        }`
              }
            >
              <Icon size={22} />

              <span>{item.name}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* Logout */}

      <div className="border-t border-zinc-800 p-5">
        <LogoutButton />
      </div>
    </aside>
  );
};

export default AdminNavbar;
