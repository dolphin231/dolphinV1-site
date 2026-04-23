"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function UserDashboardNav() {
  const pathname = usePathname();

  const navItems = [
    {
      href: "/subscription-dashboard",
      label: "Overview",
    },
    {
      href: "/subscription-dashboard/bugreport",
      label: "Bug Report",
    },
    {
      href: "/subscription-dashboard/suggestion",
      label: "Suggestion",
    },
  ];

  return (
    <nav className="flex gap-6">
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "flex items-center text-sm font-medium transition-colors hover:text-foreground/80",
            pathname === item.href
              ? "text-foreground underline underline-offset-4 decoration-2 decoration-primary"
              : "text-muted-foreground"
          )}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
