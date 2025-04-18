"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Menu,
  X,
  Home,
  Info,
  Building,
  LayoutDashboard,
  Contact,
} from "lucide-react";
import Link from "next/link";
import Logo from "@/assets/svg/Logo";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2">
          <Logo />
          <span className="text-xl font-bold text-emerald-700">BasaFinder</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8 items-center">
          <Link
            href="/"
            className="text-gray-600 hover:text-emerald-600 flex items-center gap-1"
          >
            <Home size={16} />
            <span>Home</span>
          </Link>
          <Link
            href="/about"
            className="text-gray-600 hover:text-emerald-600 flex items-center gap-1"
          >
            <Info size={16} />
            <span>About Us</span>
          </Link>
          <Link
            href="/rentals"
            className="text-gray-600 hover:text-emerald-600 flex items-center gap-1"
          >
            <Building size={16} />
            <span>Rentals</span>
          </Link>
          <Link
            href="/contact"
            className="text-gray-600 hover:text-emerald-600 flex items-center gap-1"
          >
            <Contact size={16} />
            <span>Contact Us</span>
          </Link>
          {/* <Link
            href="/dashboard"
            className="text-gray-600 hover:text-emerald-600 flex items-center gap-1"
          >
            <LayoutDashboard size={16} />
            <span>Dashboard</span>
          </Link> */}

          {isLoggedIn ? (
            <Link
              href="/dashboard"
              className="text-gray-600 hover:text-emerald-600 flex items-center gap-1"
            >
              <Button
                variant="default"
                className="bg-emerald-600 hover:bg-emerald-700"
              >
                <LayoutDashboard size={16} />
                <span>Dashboard</span>
              </Button>
            </Link>
          ) : (
            <div className="flex space-x-2">
              <Link href="/login">
                <Button className="cursor-pointer" variant="outline">Login</Button>
              </Link>
              <Link href="/register" >
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
            <Link
              href="/"
              className="text-gray-600 hover:text-emerald-600 py-2 flex items-center gap-2"
              onClick={toggleMenu}
            >
              <Home size={16} />
              <span>Home</span>
            </Link>
            <Link
              href="/about"
              className="text-gray-600 hover:text-emerald-600 py-2 flex items-center gap-2"
              onClick={toggleMenu}
            >
              <Info size={16} />
              <span>About Us</span>
            </Link>
            <Link
              href="/rentals"
              className="text-gray-600 hover:text-emerald-600 py-2 flex items-center gap-2"
              onClick={toggleMenu}
            >
              <Building size={16} />
              <span>Rentals</span>
            </Link>
            <Link
              href="/contact"
              className="text-gray-600 hover:text-emerald-600 py-2 flex items-center gap-2"
              onClick={toggleMenu}
            >
               <Contact size={16} />
               <span>Contact Us</span>
            </Link>
            {/* <Link
              href="/dashboard"
              className="text-gray-600 hover:text-emerald-600 py-2 flex items-center gap-2"
              onClick={toggleMenu}
            >
              <LayoutDashboard size={16} />
              <span>Dashboard</span>
            </Link> */}

            {isLoggedIn ? (
              <Link
                href="/dashboard"
                className="text-gray-600 hover:text-emerald-600 py-2 flex items-center gap-2"
                onClick={toggleMenu}
              >
                <Button
                  variant="default"
                  className="w-full bg-emerald-600 hover:bg-emerald-700"
                >
                  <LayoutDashboard size={16} />
                  <span>Dashboard</span>
                </Button>
              </Link>
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

{
  /* <Link href="/profile" className="py-2" onClick={toggleMenu}>
                <Button
                  variant="outline"
                  className="w-full flex items-center justify-center gap-2"
                >
                  <User size={16} />
                  <span>Profile</span>
                </Button>
              </Link> */
}

// import { useState } from "react";
// import Logo from "@/assets/svg/logo.svg";
// import {
//   NavigationMenu,
//   NavigationMenuItem,
//   NavigationMenuList,
// } from "@/components/ui/navigation-menu";
// import { Button } from "@/components/ui/button";
// import {
//   Sheet,
//   SheetContent,
//   SheetHeader,
//   SheetTitle,
//   SheetTrigger,
// } from "@/components/ui/sheet";
// import { Menu } from "lucide-react";
// import Link from "next/link";
// import Image from "next/image";

// const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false);

//   const navItems = [
//     { name: "Home", href: "/" },
//     { name: "About", href: "/about" },
//     { name: "News", href: "/news" },
//   ];

//   return (
//     <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
//       <div className="container mx-auto flex h-16 items-center justify-between sm:px-5">
//         {/* Desktop Logo */}
//         <div className="hidden md:flex items-center gap-2">
//           <Image
//             src={Logo}
//             alt={"logo"}
//             width={10}
//             height={20}
//             className="h-8 w-8"
//           />
//           <span className="text-lg font-semibold">
//             Basa<span className="text-slate-600">Finder</span>
//           </span>
//         </div>

//         {/* Mobile Logo */}
//         <div className="md:hidden flex items-center gap-1 px-2">
//           <Image
//             src={Logo}
//             alt={"logo"}
//             width={16}
//             height={16}
//             className="h-6 w-6 object-contain"
//           />
//           <span className="text-lg font-semibold">
//             Basa<span className="text-slate-600">Finder</span>
//           </span>
//         </div>

//         {/* Desktop Navigation */}
//         <nav className="hidden md:flex items-center gap-6">
//           <NavigationMenu>
//             <NavigationMenuList>
//               {navItems.map((item) => (
//                 <NavigationMenuItem key={item.name}>
//                   <Link href={item.href} >
//                     {item.name}
//                   </Link>
//                 </NavigationMenuItem>
//               ))}
//             </NavigationMenuList>
//           </NavigationMenu>
//         </nav>

//         {/* Login Button - Desktop */}
//         <div className="hidden md:block">
//           <Button variant="outline" asChild>
//             <Link href="/login">Login</Link>
//           </Button>
//         </div>

//         {/* Mobile Menu Button */}
//         <div className="md:hidden">
//           <Sheet open={isOpen} onOpenChange={setIsOpen}>
//             <SheetTrigger asChild>
//               <Button variant="ghost" size="icon">
//                 <Menu className="h-5 w-5" />
//               </Button>
//             </SheetTrigger>
//             <SheetContent side="right">
//               <SheetHeader>
//                 <SheetTitle className="text-left flex items-center gap-1">
//                   <Image
//                     src={Logo}
//                     alt="logo"
//                     width={10}
//                     height={10}
//                     className="w-4 h-4 object-contain"
//                   />
//                   Basa<span className="text-slate-600">Finder</span>
//                 </SheetTitle>
//               </SheetHeader>
//               <div className="flex flex-col gap-4 mt-8 px-2">
//                 {navItems.map((item) => (
//                   <Link
//                     key={item.name}
//                     href={item.href}
//                     className="text-sm font-medium transition-colors hover:text-primary"
//                     onClick={() => setIsOpen(false)}
//                   >
//                     {item.name}
//                   </Link>
//                 ))}
//                 <Button variant="outline" className="mt-4" asChild>
//                   <Link href="/login">Login</Link>
//                 </Button>
//               </div>
//             </SheetContent>
//           </Sheet>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Navbar;
