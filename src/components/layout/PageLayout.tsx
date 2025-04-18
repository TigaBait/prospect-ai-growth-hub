
import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import Sidebar from "./Sidebar";
import { useIsMobile } from "@/hooks/use-mobile";

interface PageLayoutProps {
  children: ReactNode;
  className?: string;
  containerClassName?: string;
}

const PageLayout = ({ 
  children, 
  className,
  containerClassName
}: PageLayoutProps) => {
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar />
      <main 
        className={cn(
          "flex-1 transition-all duration-300", 
          isMobile ? "ml-0" : "ml-64",
          className
        )}
      >
        <div className={cn("container py-6 px-4 md:py-8 md:px-6", containerClassName)}>
          {children}
        </div>
      </main>
    </div>
  );
};

export default PageLayout;
