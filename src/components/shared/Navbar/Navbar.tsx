"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Menu,
  X,
  Home,
  LayoutDashboard,
  Loader,
  User,
  LogOut,
} from "lucide-react";
import Link from "next/link";
import Logo from "@/assets/svg/Logo";
import { useUser } from "@/context/UserContext";
import { usePathname, useRouter } from "next/navigation";
import { protectedRoutes } from "@/constants";
import { getCurrentUser } from "@/services/AuthService";
import { IUser } from "@/types";

const Navbar = () => {
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { user, logout, isLoading, setUser, setIsLoading } = useUser();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleProfile = () => setIsProfileOpen(!isProfileOpen);

  const handleLogout = async () => {
    await logout();
    if (protectedRoutes.some((route) => pathname.match(route))) {
      router.push("/");
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      const res = await getCurrentUser();
      if (res) {
        setUser(res as IUser);
      }
      setIsLoading(false);
    };
    fetchUser();
  }, []);

  const links = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Rentals", path: "/rentals" },
  ];

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2">
          <Logo />
          <span className="text-xl font-bold text-emerald-700">BasaFinder</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8 items-center">
          {links.map((link, i) => (
            <Link
              key={i}
              href={link.path}
              className={
                isActive(link.path)
                  ? "text-emerald-600 border-b-emerald-600 border-b-2 flex items-center gap-1"
                  : "text-gray-600 hover:text-emerald-600 flex items-center gap-1"
              }
            >
              <Home size={16} />
              <span>{link.name}</span>
            </Link>
          ))}

          {isLoading ? (
            <Button
              variant="default"
              className="bg-emerald-600 hover:bg-emerald-700"
            >
              <Loader className="animate-spin" />
            </Button>
          ) : user ? (
            <div className="relative">
              <Button
                variant="default"
                className="bg-emerald-600 hover:bg-emerald-700 cursor-pointer"
                onClick={toggleProfile}
              >
                <User size={16} />
                <span>Profile</span>
              </Button>

              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                  <Link
                    href={
                      user?.role == "admin"
                        ? "/admin/dashboard"
                        : user?.role === "landlord"
                        ? "/landlord/listedRentals"
                        : "/tenant/myRequests"
                    }
                    className=" px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                    onClick={() => setIsProfileOpen(false)}
                  >
                    <LayoutDashboard size={16} />
                    <span>Dashboard</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2 cursor-pointer"
                  >
                    <LogOut size={16} />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex space-x-2">
              <Link href="/login">
                <Button className="cursor-pointer" variant="outline">
                  Login
                </Button>
              </Link>
              <Link href="/register">
                <Button
                  variant="default"
                  className="bg-emerald-600 hover:bg-emerald-700 cursor-pointer"
                >
                  Register
                </Button>
              </Link>
            </div>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-600 focus:outline-none"
          onClick={toggleMenu}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white px-4 pt-2 pb-4 shadow-lg animate-fade-in">
          <nav className="flex flex-col space-y-4">
            {links.map((link, i) => (
              <Link
                key={i}
                href={link.path}
                className={
                  isActive(link.path)
                    ? "text-emerald-600 flex items-center gap-2 pl-1"
                    : "text-gray-600 hover:text-emerald-600 py-2 flex items-center gap-2"
                }
                onClick={toggleMenu}
              >
                <Home size={16} />
                <span>{link.name}</span>
              </Link>
            ))}

            {user ? (
              <>
                <Link
                  href={`/${user?.role}/dashboard`}
                  className="text-gray-600 hover:text-emerald-600 py-2 flex items-center gap-2"
                  onClick={toggleMenu}
                >
                  <LayoutDashboard size={16} />
                  <span>Dashboard</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-gray-600 hover:text-emerald-600 py-2 flex items-center gap-2 w-full"
                >
                  <LogOut size={16} />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <div className="flex flex-col space-y-2">
                <Link href="/login" onClick={toggleMenu}>
                  <Button variant="outline" className="w-full">
                    Login
                  </Button>
                </Link>
                <Link href="/register" onClick={toggleMenu}>
                  <Button
                    variant="default"
                    className="w-full bg-emerald-600 hover:bg-emerald-700"
                  >
                    Register
                  </Button>
                </Link>
              </div>
            )}
          </nav>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
