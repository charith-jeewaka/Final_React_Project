import React from "react";
import { User, Mail, Phone, MapPin, Shield } from "lucide-react";

const Profile: React.FC = () => {
  return (
    <div className="mx-auto max-w-5xl space-y-8">

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Left Card */}
        <div className="rounded-3xl bg-white p-8 shadow">
          <div className="flex flex-col items-center">
            <div className="flex h-32 w-32 items-center justify-center rounded-full bg-emerald-100">
              <User size={60} className="text-emerald-600" />
            </div>

            <h2 className="mt-5 text-2xl font-bold">Welcome!</h2>

            <p className="text-zinc-500">Customer Account</p>

            <span className="mt-4 rounded-full bg-emerald-100 px-4 py-2 font-semibold text-emerald-700">
              Active User
            </span>
          </div>
        </div>

        {/* Right Card */}
        <div className="rounded-3xl bg-white p-8 shadow lg:col-span-2">
          <h2 className="mb-8 text-2xl font-bold">Account Information</h2>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border p-5">
              <div className="mb-3 flex items-center gap-2">
                <User className="text-emerald-600" size={20} />
                <span className="font-semibold">Full Name</span>
              </div>

              <p className="text-zinc-500">Loading...</p>
            </div>

            <div className="rounded-2xl border p-5">
              <div className="mb-3 flex items-center gap-2">
                <Mail className="text-emerald-600" size={20} />
                <span className="font-semibold">Email</span>
              </div>

              <p className="text-zinc-500">Loading...</p>
            </div>

            <div className="rounded-2xl border p-5">
              <div className="mb-3 flex items-center gap-2">
                <Phone className="text-emerald-600" size={20} />
                <span className="font-semibold">Phone</span>
              </div>

              <p className="text-zinc-500">Not Added</p>
            </div>

            <div className="rounded-2xl border p-5">
              <div className="mb-3 flex items-center gap-2">
                <MapPin className="text-emerald-600" size={20} />
                <span className="font-semibold">Address</span>
              </div>

              <p className="text-zinc-500">Not Added</p>
            </div>

            <div className="rounded-2xl border p-5 md:col-span-2">
              <div className="mb-3 flex items-center gap-2">
                <Shield className="text-emerald-600" size={20} />
                <span className="font-semibold">Account Status</span>
              </div>

              <p className="text-zinc-500">
                Your account is active and ready to place orders.
              </p>
            </div>
          </div>

          <div className="mt-8 flex gap-4">
            <button
              disabled
              className="rounded-xl bg-emerald-500 px-6 py-3 font-semibold text-white opacity-60"
            >
              Edit Profile
            </button>

            <button
              disabled
              className="rounded-xl border border-zinc-300 px-6 py-3 font-semibold text-zinc-600 opacity-60"
            >
              Change Password
            </button>
          </div>

          <p className="mt-4 text-sm text-zinc-400">
            Profile editing will be available in a future update.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
