// src/components/user/UserNavbar.tsx

import { NavLink } from "react-router-dom";
import LogoutButton from "../common/LogoutButton";

const UserNavbar = () => {
  const menuItems = [
    { name: "Home", path: "/dashboard" },
    { name: "Cart", path: "/dashboard/userCart" },
    { name: "My Orders", path: "/dashboard/orders" },
    // { name: "Wishlist", path: "/dashboard/wishlist" },
    { name: "Profile", path: "/dashboard/profile" },
  ];

  return (
    <nav className="bg-zinc-900 text-white shadow-md">
      <div className="mx-auto flex h-16 items-center justify-between px-6">
        {/* Logo */}
        <h1 className="text-2xl font-bold text-emerald-400">Creative Flora</h1>

        {/* Navigation */}
        <div className="hidden md:flex items-center gap-6">
          {menuItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `transition-colors ${
                  isActive
                    ? "text-emerald-400 font-semibold"
                    : "hover:text-emerald-300"
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </div>

        {/* Logout */}
        <LogoutButton />
      </div>
    </nav>
  );
};

export default UserNavbar;
