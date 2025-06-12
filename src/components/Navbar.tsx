"use client";

import Link from "next/link";
import React from "react";
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
  return (
    <nav className="flex items-center justify-between p-4 bg-white dark:bg-neutral-800 w-2/3 mx-auto">
      <div className="flex items-center">
        <img src={logoSrc} alt={logoAlt} className="h-16 mr-2" />
      </div>
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
