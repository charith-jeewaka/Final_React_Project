import { NavLink } from "react-router-dom";
import LogoutButton from "../common/LogoutButton";

import {
  Home,
  ShoppingCart,
  PackageCheck,
  UserRound,
  Store,
} from "lucide-react";

const UserNavbar = () => {
  const menuItems = [
    {
      name: "Home",
      path: "/dashboard",
      icon: Home,
    },
    {
      name: "Cart",
      path: "/dashboard/userCart",
      icon: ShoppingCart,
    },
    {
      name: "My Orders",
      path: "/dashboard/myOrders",
      icon: PackageCheck,
    },
    {
      name: "Profile",
      path: "/dashboard/profile",
      icon: UserRound,
    },
  ];

  return (
    <nav className="bg-zinc-900 text-white shadow-md">
      <div className="mx-auto flex h-16 items-center justify-between px-6">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <Store size={32} className="text-emerald-400" />

          <h1 className="text-2xl font-bold text-emerald-400">EzShop</h1>
        </div>

        {/* Navigation */}
        <div className="hidden items-center gap-6 md:flex">
          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-2 transition-colors
                  ${
                    isActive
                      ? "font-semibold text-emerald-400"
                      : "text-zinc-300 hover:text-emerald-300"
                  }`
                }
              >
                <Icon size={20} />

                <span>{item.name}</span>
              </NavLink>
            );
          })}
        </div>

        {/* Logout */}
        <LogoutButton />
      </div>
    </nav>
  );
};

export default UserNavbar;
