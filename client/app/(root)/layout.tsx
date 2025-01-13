"use client";

import Sidebar from "@/components/Sidebar";
import { CopilotPopup } from "@copilotkit/react-ui";
import { CopilotKit } from "@copilotkit/react-core";
import { useEffect, useState } from "react";
import "@copilotkit/react-ui/styles.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const loggedIn = { firstName: "Jan", lastName: "Eberwein" };
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <main className="flex h-screen w-full font-inter">
      <CopilotKit runtimeUrl="/api/copilotkit">
        <Sidebar user={loggedIn} />
        {children}
        {/* Render CopilotPopup only on the client to avoid SSR mismatches */}
        {isClient && (
          <CopilotPopup
            instructions={
              "You are assisting the user as best as you can. " +
              "Do not go into technical details beyond what a regular user is expected to understand, " +
              "unless the user seems like he has above-average technical knowledge. Answer in the best way " +
              "possible given the data you have."
            }
            labels={{
              title: "Your Assistant",
              initial: "Hi! 👋 How can I assist you today?",
            }}
            shortcut="/"
          />
        )}
      </CopilotKit>
    </main>
  );
}
