"use client";

import Link from "next/link";
import { useSearchParams, usePathname } from "next/navigation";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface NavLinkCompatProps {
  href: string;
  className?: string;
  activeClassName?: string;
  children: React.ReactNode;
}

const NavLink = forwardRef<HTMLAnchorElement, NavLinkCompatProps>(
  ({ className, activeClassName, href, children, ...props }, ref) => {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const lang = searchParams?.get("lang");

    const buildLink = (path: string): string => {
      if (lang === "ENG" || lang === "ESP") {
        return `${path}?lang=${lang}`;
      }
      return path;
    };

    const isActive = pathname === href;

    return (
      <Link
        ref={ref}
        href={buildLink(href)}
        className={cn(className, isActive && activeClassName)}
        {...props}
      >
        {children}
      </Link>
    );
  }
);

NavLink.displayName = "NavLink";

export { NavLink };
