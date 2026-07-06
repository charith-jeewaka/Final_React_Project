import { NavLink } from "react-router-dom";
import LogoutButton from "./LogoutButton";

const AdminNavbar = () => {
  const menuItems = [
    { name: "Dashboard", path: "/admin" },
    { name: "Items", path: "/admin/items" },
    { name: "Orders", path: "/admin/orders" },
    { name: "Customers", path: "/admin/customers" },
    { name: "Reports", path: "/admin/reports" },
    { name: "Emails", path: "/admin/emails" }
    // { name: "Employees", path: "/admin/employees" },
    // { name: "Settings", path: "/admin/settings" },
  ];

  return (
    <aside className="w-64 h-screen bg-zinc-900 border-r border-zinc-800 text-white flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-zinc-800">
        <h1 className="text-2xl font-bold text-emerald-400">Creative Flora</h1>
      </div>

      {/* Menu */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `block rounded-lg px-4 py-3 transition-all duration-200 ${
                isActive
                  ? "bg-emerald-500 text-black font-semibold"
                  : "hover:bg-zinc-800"
              }`
            }
          >
            {item.name}
          </NavLink>
        ))}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-zinc-800">
        <LogoutButton />
      </div>
    </aside>
  );
};

export default AdminNavbar;
