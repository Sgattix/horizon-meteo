"use client";

import Link from "next/link";
import React, { useState } from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

// Define types for the Navbar props
type NavbarLink = {
  label: string;
  href?: string;
  children?: NavbarLink[]; // For dropdowns
  description?: string; // Optional, for dropdown items
  icon?: React.ReactNode; // Optional, for icon support
};

type NavbarProps = {
  links: NavbarLink[];
  logoSrc?: string;
  logoAlt?: string;
};

export default function Navbar({
  links,
  logoSrc = "/logo.png",
  logoAlt = "Logo",
}: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="flex items-center justify-between p-4 bg-white dark:bg-neutral-800 w-full md:w-2/3 mx-auto relative">
      <div className="flex items-center">
        <img src={logoSrc} alt={logoAlt} className="h-12 md:h-16 mr-2" />
      </div>
      {/* Desktop Menu */}
      <div className="hidden md:block">
        <NavigationMenu viewport={false}>
          <NavigationMenuList>
            {links.map((link) =>
              link.children && link.children.length > 0 ? (
                <NavigationMenuItem key={link.label} className="relative">
                  <NavigationMenuTrigger>{link.label}</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-2 p-2">
                      {link.children.map((child) => (
                        <ListItem
                          key={child.label}
                          href={child.href || "#"}
                          title={child.label}
                          icon={child.icon}
                        >
                          {child.description}
                        </ListItem>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              ) : (
                <NavigationMenuItem key={link.label}>
                  <NavigationMenuLink
                    asChild
                    className={navigationMenuTriggerStyle()}
                  >
                    <Link href={link.href || "#"}>{link.label}</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              )
            )}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      {/* Hamburger Icon */}
      <button
        className="md:hidden flex items-center px-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-neutral-400"
        onClick={() => setMobileOpen((open) => !open)}
        aria-label="Toggle menu"
      >
        <svg
          className="h-7 w-7 text-neutral-800 dark:text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          {mobileOpen ? (
            // X icon
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            // Hamburger icon
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>
      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="absolute top-full left-0 w-full bg-white dark:bg-neutral-800 shadow-md z-50 md:hidden animate-fade-in">
          <ul className="flex flex-col gap-2 p-4">
            {links.map((link) =>
              link.children && link.children.length > 0 ? (
                <li key={link.label} className="group">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{link.label}</span>
                    {/* Dropdown toggle for mobile */}
                    {/* You can add a dropdown toggle here if needed */}
                  </div>
                  <ul className="pl-4 mt-1">
                    {link.children.map((child) => (
                      <li key={child.label}>
                        <Link
                          href={child.href || "#"}
                          className="block py-1 text-sm hover:underline"
                          onClick={() => setMobileOpen(false)}
                        >
                          {child.icon}
                          {child.label}
                        </Link>
                        {child.description && (
                          <p className="text-xs text-muted-foreground">
                            {child.description}
                          </p>
                        )}
                      </li>
                    ))}
                  </ul>
                </li>
              ) : (
                <li key={link.label}>
                  <Link
                    href={link.href || "#"}
                    className="block py-2 font-medium hover:underline"
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </Link>
                </li>
              )
            )}
          </ul>
        </div>
      )}
    </nav>
  );
}

function ListItem({
  title,
  children,
  href,
  icon,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & {
  href: string;
  icon?: React.ReactNode;
}) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link href={href} className="flex items-center gap-2">
          {icon}
          <div>
            <div className="text-sm leading-none font-medium">{title}</div>
            {children && (
              <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
                {children}
              </p>
            )}
          </div>
        </Link>
      </NavigationMenuLink>
    </li>
  );
}
