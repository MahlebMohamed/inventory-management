"use client";

import { checkAndAddAssociation } from "@/app/actions/category.actions";
import { UserButton, useUser } from "@clerk/nextjs";
import { ListTree, Menu, PackagePlus, ShoppingBasket, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Toggle } from "./ui/toggle";

export default function Navbar() {
  const { user } = useUser();

  const pathname = usePathname();
  const navlinks = [
    { href: "/products", label: "Produit", icon: ShoppingBasket },
    { href: "/new-product", label: "Nouveau produit", icon: PackagePlus },
    { href: "/category", label: "Category", icon: ListTree },
  ];
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(
    function () {
      if (user?.primaryEmailAddress?.emailAddress && user.fullName) {
        checkAndAddAssociation(
          user?.primaryEmailAddress?.emailAddress,
          user.fullName,
        );
      }
    },
    [user],
  );

  function renderLinks(): React.ReactNode {
    return (
      <>
        {navlinks.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href;
          return (
            <Link href={href} key={href}>
              <Button
                variant={`${isActive ? "destructive" : "outline"}`}
                className="flex w-full items-center gap-2 text-sm sm:w-auto"
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
    <header className="border-muted relative border-b p-5 md:px-[10%]">
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

        <div className="hidden w-full items-center gap-2 space-x-2 sm:flex sm:w-auto">
          {renderLinks()}
          <UserButton />
        </div>
      </nav>

      <div
        className={`bg-secondary absolute top-0 z-50 flex h-screen w-full flex-col gap-2 p-4 transition-all duration-300 sm:hidden ${menuOpen ? "left-0" : "-left-full"} `}
      >
        <div className="flex w-full items-center justify-between">
          <Toggle
            aria-label="Toggle bold"
            className="!hover:bg-blue-600 my-3 w-fit cursor-pointer !bg-red-500 !text-white sm:hidden"
            pressed={menuOpen}
            onPressedChange={handleMenuClick}
          >
            <X className="h-10 w-10" />
          </Toggle>
          <UserButton />
        </div>
        <div className="flex w-full flex-col items-stretch space-y-2">
          {renderLinks()}
        </div>
      </div>
    </header>
  );
}
