import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { Link, useLocation } from "wouter";
import {
  LayoutDashboard,
  MessageSquare,
  User,
  LogOut,
} from "lucide-react";

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    href: string;
    title: string;
    icon: React.ReactNode;
  }[];
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const navigation = [
    {
      href: "/dashboard",
      title: "Dashboard",
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      href: "/chat",
      title: "AI Advisor",
      icon: <MessageSquare className="h-5 w-5" />,
    },
    {
      href: "/profile",
      title: "Profile",
      icon: <User className="h-5 w-5" />,
    },
  ];

  return (
    <div className="min-h-screen grid grid-cols-[240px_1fr]">
      <SidebarNav items={navigation} className="border-r" />
      <main className="p-6">{children}</main>
    </div>
  );
}

function SidebarNav({ className, items, ...props }: SidebarNavProps) {
  const [location] = useLocation();
  const { logoutMutation, user } = useAuth();

  return (
    <nav
      className={cn("flex flex-col bg-sidebar text-sidebar-foreground", className)}
      {...props}
    >
      <div className="px-4 py-6">
        <h2 className="text-lg font-semibold">AI Investment Advisor</h2>
      </div>
      
      <div className="space-y-1 px-2 flex-1">
        {items.map((item) => (
          <Link key={item.href} href={item.href}>
            <Button
              variant={location === item.href ? "secondary" : "ghost"}
              className="w-full justify-start"
            >
              {item.icon}
              <span className="ml-2">{item.title}</span>
            </Button>
          </Link>
        ))}
      </div>

      <div className="p-4 border-t border-sidebar-border">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex-1">
            <p className="font-medium">{user?.fullName}</p>
            <p className="text-sm text-sidebar-foreground/70">{user?.email}</p>
          </div>
        </div>
        <Button
          variant="ghost"
          className="w-full justify-start text-destructive"
          onClick={() => logoutMutation.mutate()}
        >
          <LogOut className="h-5 w-5 mr-2" />
          Logout
        </Button>
      </div>
    </nav>
  );
}
