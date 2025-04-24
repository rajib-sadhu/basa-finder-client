"use client";

import * as React from "react";
import { Hand, House, Loader, SquareTerminal, User } from "lucide-react";

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
            },
            {
              title: "Profile",
              url: "/admin/profile",
              icon: User,
            },
          ],
        }
      : user?.role === "landlord"
      ? {
          navMain: [
            // {
            //   title: "Dashboard",
            //   url: "/landlord/dashboard",
            //   icon: SquareTerminal,
            //   isActive: true,
            // },
            {
              title: "Rental House Management",
              url: "/landlord/listedRentals",
              icon: House,
            },
            {
              title: "Rental Requests",
              url: "/landlord/landlordRequests",
              icon: Hand,
            },
            {
              title: "Profile",
              url: "/landlord/profile",
              icon: User,
            },
          ],
        }
      : {
          navMain: [
            {
              title: "Requested",
              url: "/tenant/myRequests",
              icon: House,
            },
            {
              title: "Profile",
              url: "/tenant/profile",
              icon: User,
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
