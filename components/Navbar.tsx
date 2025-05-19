"use client";

import { ListTree, Menu, PackagePlus } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import { Toggle } from "./ui/toggle";
import { useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const navlinks = [{ href: "/category", label: "Category", icon: ListTree }];
  const [menuOpen, setMenuOpen] = useState(false);

  function renderLinks(): React.ReactNode {
    return (
      <>
        {navlinks.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href;
          return (
            <Link href={href} key={href}>
              <Button
                variant={`${isActive ? "destructive" : "outline"}`}
                className="flex items-center gap-2 text-sm"
              >
                <Icon className={`h-4 w-4`} />
                <span>{label}</span>
              </Button>
            </Link>
          );
        })}
      </>
    );
  }

  function handleMenuClick() {
    setMenuOpen((prev) => !prev);
  }

  return (
    <header className="border-muted-foreground relative border-b p-5 md:px-[10%]">
      <nav className="flex items-center justify-between">
        <Link href="/" className="flex cursor-pointer items-center gap-2">
          <PackagePlus className="text-primary h-8 w-8" />
          <span className="text-2xl font-black">AssoStock</span>
        </Link>

        <Toggle
          aria-label="Toggle bold"
          className="w-fit cursor-pointer sm:hidden"
          pressed={menuOpen}
          onPressedChange={handleMenuClick}
        >
          <Menu className="h-10 w-10" />
        </Toggle>

        <div className="hidden items-center space-x-2 sm:flex">
          {renderLinks()}
        </div>
      </nav>

      <div
        className={`bg-secondary absolute top-0 z-50 flex h-screen w-full flex-col gap-2 p-4 transition-all duration-300 sm:hidden ${menuOpen ? "left-0" : "-left-0"} `}
      >
        GGGGGGG
      </div>
    </header>
  );
}
