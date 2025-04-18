
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  Home, 
  Users, 
  Target, 
  BarChart3, 
  MessageSquare, 
  Settings, 
  Menu, 
  X,
  LogOut
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

interface SidebarProps {
  className?: string;
}

const Sidebar = ({ className }: SidebarProps) => {
  const location = useLocation();
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(!isMobile);

  useEffect(() => {
    setIsOpen(!isMobile);
  }, [isMobile]);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const menuItems = [
    {
      title: "Dashboard",
      icon: Home,
      href: "/dashboard",
    },
    {
      title: "Prospects",
      icon: Users,
      href: "/prospects",
    },
    {
      title: "ICP Builder",
      icon: Target,
      href: "/icp",
    },
    {
      title: "Campaigns",
      icon: BarChart3,
      href: "/campaigns",
    },
    {
      title: "Messages",
      icon: MessageSquare,
      href: "/messages",
    },
    {
      title: "Settings",
      icon: Settings,
      href: "/settings",
    },
  ];

  return (
    <>
      {isMobile && (
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          className="fixed top-4 left-4 z-50"
        >
          <Menu className="h-5 w-5" />
        </Button>
      )}
      <div
        className={cn(
          "fixed top-0 left-0 z-40 h-full transition-all duration-300",
          isMobile ? (isOpen ? "translate-x-0" : "-translate-x-full") : "",
          className
        )}
      >
        <div className="flex h-full flex-col bg-sidebar border-r border-sidebar-border w-64">
          <div className="p-4 flex justify-between items-center border-b border-sidebar-border">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center text-white font-semibold">P</div>
              <h1 className="text-xl font-bold text-sidebar-primary">ProspectAI</h1>
            </Link>
            {isMobile && (
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleSidebar}
              >
                <X className="h-5 w-5" />
              </Button>
            )}
          </div>
          <div className="flex-1 overflow-y-auto pt-5 px-3">
            <ul className="space-y-2">
              {menuItems.map((item) => (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    className={cn(
                      "flex items-center p-2 text-base font-normal rounded-lg hover:bg-sidebar-accent group",
                      location.pathname === item.href
                        ? "bg-sidebar-accent text-sidebar-primary"
                        : "text-sidebar-foreground"
                    )}
                  >
                    <item.icon className="w-5 h-5 transition duration-75" />
                    <span className="ml-3">{item.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="p-4 border-t border-sidebar-border">
            <Button variant="ghost" className="w-full justify-start px-2 text-sidebar-foreground">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </Button>
          </div>
        </div>
      </div>
      
      {isMobile && isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30"
          onClick={toggleSidebar}
        />
      )}
    </>
  );
};

export default Sidebar;
