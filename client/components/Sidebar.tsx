"use client";

import { sidebarLinks } from "@/constants";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import UserCard from "./UserCard";

const Sidebar = ({ user }: SidebarProps) => {
  const pathname = usePathname();

  return (
    <section className="sidebar flex flex-col h-full">
      <nav className="flex flex-col gap-4">
        {/* Logo */}
        <Link href="/" className="mb-12 cursor-pointer flex items-center gap-2">
          <div className="w-full max-w-[400px] mx-auto">
            <Image
              src="/icons/QuantumLogo.png"
              layout="responsive"
              width={16}
              height={9}
              objectFit="contain"
              alt="Quantum logo"
              className="sidebar-logo"
            />
          </div>
        </Link>

        {/* Navigation Links */}
        {sidebarLinks.map((item) => {
          const isActive =
            pathname === item.route || pathname.startsWith(`${item.route}/`);

          return (
            <Link
              href={item.route}
              key={item.label}
              className={cn(
                "sidebar-link flex items-center gap-2 p-3 rounded-lg transition-colors",
                { "bg-bank-gradient text-white": isActive }
              )}
            >
              <div className="relative size-6">
                <Image
                  src={item.imgURL}
                  alt={item.label}
                  fill
                  className={cn("brightness-0", {
                    "brightness-[3] invert-0": isActive,
                  })}
                />
              </div>
              <p className={cn("sidebar-label text-gray-700", { "!text-white": isActive })}>
                {item.label}
              </p>
            </Link>
          );
        })}
      </nav>
      <UserCard />
    </section>
  );
};

export default Sidebar;
