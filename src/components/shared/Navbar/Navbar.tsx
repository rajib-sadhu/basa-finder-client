"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Menu,
  X,
  LayoutDashboard,
  Loader,
  User,
  LogOut,
  ChevronDown,
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
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { user, logout, isLoading, setUser, setIsLoading } = useUser();

  const isActive = (path: string) => {
    const [basePath] = path.split("#");
    return pathname === basePath;
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleProfile = () => setIsProfileOpen(!isProfileOpen);

  const handleLogout = async () => {
    await logout();
    if (protectedRoutes.some((route) => pathname.match(route))) {
      router.push("/");
    }
    setIsMenuOpen(false);
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
    { name: "FAQ", path: "/help-centre#faq" },
    { name: "Pricing", path: "/pricing" },
  ];

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <Logo />
          <span className="text-xl font-bold text-emerald-700">BasaFinder</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-8 items-center">
          {links.map((link, i) => (
            <Link
              key={i}
              href={link.path}
              className={`${
                isActive(link.path)
                  ? "text-emerald-600 border-b-2 border-emerald-600"
                  : "text-gray-600 hover:text-emerald-600"
              } flex items-center gap-1`}
            >
              {link.name}
            </Link>
          ))}

          {/* Pages Mega Menu */}
          <div className="relative group">
            <button className="text-gray-600 hover:text-emerald-600 flex items-center gap-1">
              Pages <ChevronDown size={16} />
            </button>
            <div className="absolute left-0 top-full bg-white shadow-lg rounded-md p-4 hidden group-hover:block w-48 z-40">
              <Link
                href="/blog"
                className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
              >
                Blog
              </Link>
              <Link
                href="/404"
                className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
              >
                404 Page
              </Link>
            </div>
          </div>

          {/* Auth / Profile */}
          {isLoading ? (
            <Button className="bg-emerald-600 hover:bg-emerald-700">
              <Loader className="animate-spin" />
            </Button>
          ) : user ? (
            <div className="relative">
              <Button
                onClick={toggleProfile}
                className="bg-emerald-600 hover:bg-emerald-700 flex items-center gap-1"
              >
                <User size={16} />
                Profile
              </Button>
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                  <Link
                    href={
                      user.role === "admin"
                        ? "/admin/dashboard"
                        : user.role === "landlord"
                        ? "/landlord/listedRentals"
                        : "/tenant/myRequests"
                    }
                    onClick={() => setIsProfileOpen(false)}
                    className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                  >
                    <LayoutDashboard size={16} />
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                  >
                    <LogOut size={16} />
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link href="/login">
              <Button className="bg-emerald-600 hover:bg-emerald-700">
                Login
              </Button>
            </Link>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden text-gray-700" onClick={toggleMenu}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white px-4 py-4 space-y-3 shadow-md">
          {links.map((link, i) => (
            <Link
              key={i}
              href={link.path}
              onClick={() => setIsMenuOpen(false)}
              className={`${
                isActive(link.path)
                  ? "text-emerald-600 font-semibold"
                  : "text-gray-600 hover:text-emerald-600"
              } block py-2`}
            >
              {link.name}
            </Link>
          ))}

          {/* Pages Sub-links */}
          <div className="pt-2 border-t border-gray-200">
            <Link
              href="/blog"
              onClick={() => setIsMenuOpen(false)}
              className="block text-gray-600 hover:text-emerald-600 py-2"
            >
              Blog
            </Link>
            <Link
              href="/404"
              onClick={() => setIsMenuOpen(false)}
              className="block text-gray-600 hover:text-emerald-600 py-2"
            >
              404 Page
            </Link>
          </div>

          {/* Auth Options */}
          {user ? (
            <>
              <Link
                href={`/${user.role}/dashboard`}
                onClick={() => setIsMenuOpen(false)}
                className="block text-gray-600 hover:text-emerald-600 py-2 flex items-center gap-2"
              >
                <LayoutDashboard size={16} />
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="text-gray-600 hover:text-emerald-600 py-2 flex items-center gap-2 w-full"
              >
                <LogOut size={16} />
                Logout
              </button>
            </>
          ) : (
            <div className="flex flex-col space-y-2 pt-2">
              <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                <Button variant="outline" className="w-full">
                  Login
                </Button>
              </Link>
              <Link href="/register" onClick={() => setIsMenuOpen(false)}>
                <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
                  Register
                </Button>
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
