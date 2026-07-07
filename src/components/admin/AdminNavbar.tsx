import { NavLink } from "react-router-dom";
import LogoutButton from "../common/LogoutButton";

const AdminNavbar = () => {
  const menuItems = [
    { name: "Dashboard", path: "/admin" },
    { name: "Products", path: "/admin/addProducts" },
    { name: "Orders", path: "/admin/orders" },
    { name: "Inventory", path: "/admin/inventory" },
    { name: "Reports", path: "/admin/reports" },
    { name: "Emails", path: "/admin/emails" },
  ];

  return (
    <aside className="w-72 bg-zinc-950 text-white shadow-2xl flex flex-col">
      {/* Logo */}

      <div className="border-b border-zinc-800 px-8 py-7">
        <h1 className="text-3xl font-black text-emerald-400">Creative</h1>

        <p className="text-sm text-zinc-400 mt-1">Admin Dashboard</p>
      </div>

      {/* Menu */}

      <nav className="flex-1 overflow-y-auto p-5 space-y-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            end={item.path === "/admin"}
            className={({ isActive }) =>
              `group flex items-center rounded-xl px-5 py-3 transition-all duration-300
              ${
                isActive
                  ? "bg-emerald-500 text-black font-semibold shadow-lg"
                  : "text-zinc-300 hover:bg-zinc-900 hover:text-white"
              }`
            }
          >
            {item.name}
          </NavLink>
        ))}
      </nav>

      {/* Logout */}

      <div className="border-t border-zinc-800 p-5">
        <LogoutButton />
      </div>
    </aside>
  );
};

export default AdminNavbar;
