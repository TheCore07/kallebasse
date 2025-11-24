import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup, SidebarGroupContent, SidebarGroupLabel,
    SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem } from "@/components/ui/dropdown-menu.tsx";
import { SideBarItems } from "@/components/SideBarConf.tsx";
import { useAuth } from "@/context/AuthContext.tsx";
import {Bell, CreditCard, LogOut, User, CircleUserRound } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function AppSidebar() {
    const { user } = useAuth();
    const navigate = useNavigate();

    return (
        <Sidebar collapsible="icon">
            <SidebarHeader className="px-4 py-3 border-b border-gray-700 flex gap-2">
                <SidebarGroupLabel className="text-base font-semibold">TrackÄTime</SidebarGroupLabel>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {SideBarItems.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <a href={item.path}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter className="border-t border-gray-700">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="ghost"
                            className="w-full justify-start gap-3 p-3 h-auto"
                        >
                            <Avatar className="h-8 w-8">
                                <AvatarImage src={user.avatar} alt={user.name} />
                                <AvatarFallback>
                                    <CircleUserRound className="h-4 w-4" />
                                </AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col text-left">
                                <span className="text-sm font-medium leading-none">{user.name}</span>
                                <span className="text-xs text-muted-foreground truncate">
                  {user.email}
                </span>
                            </div>
                        </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent side="top" align="start" className="w-56">
                        <DropdownMenuLabel className="flex flex-col">
                            <span>{user.name}</span>
                            <span className="text-xs text-muted-foreground">{user.email}</span>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => navigate("/profile")}>
                            <User className="mr-2 h-4 w-4" />
                            Account
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <CreditCard className="mr-2 h-4 w-4" />
                            Billing
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Bell className="mr-2 h-4 w-4" />
                            Notifications
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                            className="text-destructive focus:text-destructive"
                            onClick={() => console.log("logout")}
                        >
                            <LogOut className="mr-2 h-4 w-4" />
                            Log out
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarFooter>
        </Sidebar>
    )
}