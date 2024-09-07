"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import { useStore } from "@/lib/store";
import { useRouter } from "next/navigation";

const Header: React.FC = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const { logout } = useStore();

  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  return (
    <header className="bg-white shadow-md p-4 flex items-center justify-between">
      <Link href="/" className="text-xl font-bold">
        FitTrack
      </Link>
      {session ? (
        <div className="relative">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex items-center gap-2"
          >
            <Image
              src={session?.user?.image ?? "/images/placeholder-profile.png"}
              alt="Profile Picture"
              width={40}
              height={40}
              className="rounded-full"
            />
            <span className="hidden sm:block">{session?.user?.name}</span>
          </button>
          {showDropdown && (
            <div className="absolute right-0 mt-2 bg-white rounded-md shadow-md z-10">
              <ul className="p-2">
                <li>
                  <Link
                    href="/dashboard"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      ) : (
        <Link href="/login" className="text-blue-500 hover:text-blue-700">
          Login
        </Link>
      )}
    </header>
  );
};

export default Header;