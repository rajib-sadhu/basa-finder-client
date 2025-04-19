"use client";

import * as React from "react";
import { House, Loader, SquareTerminal, User } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { NavMain } from "./nav-main";
import Link from "next/link";
import Logo from "@/assets/svg/Logo";
import { NavUser } from "./nav-user";
import { useUser } from "@/context/UserContext";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user, isLoading } = useUser();

  if (isLoading) {
    return <Loader />;
  }

  const data =
    user?.role === "admin"
      ? {
          navMain: [
            {
              title: "Dashboard",
              url: "/admin/dashboard",
              icon: SquareTerminal,
              isActive: true,
            },
            {
              title: "User Management",
              url: "/admin/allUsers",
              icon: User,
            },
            {
              title: "Rental House Management",
              url: "/admin/allLists",
              icon: House,
              // items: [
              //   {
              //     title: "All Listing",
              //     url: "/admin/allLists",
              //   },
              //   {
              //     title: "New Listing",
              //     url: "/admin/newLists",
              //   },
              // ],
            },
          ],
        }
      : user?.role === "landlord"
      ? {
          navMain: [
            {
              title: "Dashboard",
              url: "/landlord/dashboard",
              icon: SquareTerminal,
              isActive: true,
            },
            {
              title: "Rental House Management",
              url: "/landlord/listedRentals",
              icon: House,
            },
          ],
        }
      : {
          navMain: [
            {
              title: "Dashboard",
              url: "/user/dashboard",
              icon: SquareTerminal,
              isActive: true,
            },
            {
              title: "Profile",
              url: "/user/profile",
              icon: User,
            },
            {
              title: "Requested",
              url: "/user/requested",
              icon: House,
            },
          ],
        };

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/">
                <div className="flex items-center justify-center">
                  <Logo />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <h2 className="font-bold text-xl">BasaFinder</h2>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
