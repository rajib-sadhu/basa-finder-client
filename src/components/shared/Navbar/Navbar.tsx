"use client";

import { useState } from "react";
import Logo from "@/assets/svg/logo.svg";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "News", href: "/news" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between sm:px-5">
        {/* Desktop Logo */}
        <div className="hidden md:flex items-center gap-2">
          <Image
            src={Logo}
            alt={"logo"}
            width={10}
            height={20}
            className="h-8 w-8"
          />
          <span className="text-lg font-semibold">
            Basa<span className="text-slate-600">Finder</span>
          </span>
        </div>

        {/* Mobile Logo */}
        <div className="md:hidden flex items-center gap-1 px-2">
          <Image
            src={Logo}
            alt={"logo"}
            width={16}
            height={16}
            className="h-6 w-6 object-contain"
          />
          <span className="text-lg font-semibold">
            Basa<span className="text-slate-600">Finder</span>
          </span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <NavigationMenu>
            <NavigationMenuList>
              {navItems.map((item) => (
                <NavigationMenuItem key={item.name}>
                  <Link href={item.href} legacyBehavior passHref>
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                    >
                      {item.name}
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </nav>

        {/* Login Button - Desktop */}
        <div className="hidden md:block">
          <Button variant="outline" asChild>
            <Link href="/login">Login</Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle className="text-left flex items-center gap-1">
                  <Image src={Logo} alt="logo" width={10} height={10} className="w-4 h-4 object-contain" />
                  Basa<span className="text-slate-600">Finder</span>
                </SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-4 mt-8 px-2">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-sm font-medium transition-colors hover:text-primary"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                <Button variant="outline" className="mt-4" asChild>
                  <Link href="/login">Login</Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
