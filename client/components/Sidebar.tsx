"use client"
import { sidebarLinks } from "@/constants";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import {usePathname, useRouter} from "next/navigation";
import UserCard from "./UserCard";
import {useCopilotAction, useCopilotReadable} from "@copilotkit/react-core";
import {TestShadcnChartCard} from "@/components/TestShadcnChartCard";
import React from "react";

const Sidebar = ({ user }: SidebarProps) => {
  const pathname = usePathname();
  const router = useRouter();

  useCopilotReadable({
    description: "The available pages/parts of the application",
    value: sidebarLinks,
  });

  useCopilotReadable({
    description: "The currently signed in user",
    value: user,
  });

  // Define Copilot action
  useCopilotAction({
    name: "navigate",
    description: "Navigate to another route",
    parameters: [
      {
        name: "routeName",
        type: "string",
        description: "The route to navigate to",
        required: true,
      },
    ],
    handler: async ({ routeName }) => {
      // Check if routeName exists and is valid
      if (!routeName || typeof routeName !== "string") {
        console.error("Invalid routeName provided");
        return;
      }

      try {
        // Use Next.js router to navigate
        await router.push(routeName);
      } catch (error) {
        console.error("Failed to navigate to the route:", error);
      }
    },
  });

  useCopilotAction({
    name: "displayChart",
    description: "Render the TestShadcnChart component.",
    parameters: [],
    render: ({status}) => {
      try {
        if (status === 'inProgress') {
          return "Loading...";
        } else {
          return <TestShadcnChartCard></TestShadcnChartCard>;
        }
      } catch (error) {
        console.error(error.message);
      }
    },
  });

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
