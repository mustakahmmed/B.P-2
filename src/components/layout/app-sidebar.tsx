"use client"

import * as React from "react"
import { usePathname } from "next/navigation"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import Link from "next/link"
import { adminRoutes } from "@/routes/adminRoutes"
import { userRoutes } from "@/routes/userRoutes"
import { Route } from "@/types"
import { Roles } from "@/constent/role"


export function AppSidebar({user, ...props }:{user:{role:string} & React.ComponentProps<typeof Sidebar>}) {
  const pathname = usePathname()
  
  let route:Route[] = [];
  switch (user.role) {
    case Roles.user:
      route = userRoutes
      break;

    case Roles.admin:
      route = adminRoutes
      break;
  
    default:
      route =[]
      break;
  }
  return (
    <Sidebar {...props}>
      <SidebarContent>
        {/* We create a SidebarGroup for each parent. */}
        {route.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={pathname === item.url}>
                      <Link href={item.url}>{item.title}</Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
