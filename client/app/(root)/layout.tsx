"use client";
import Sidebar from "@/components/Sidebar";
import { CopilotPopup } from "@copilotkit/react-ui";
import { CopilotKit } from "@copilotkit/react-core";
import "@copilotkit/react-ui/styles.css";
import CopilotChartHandler from "@/components/CopilotChartHandler"; // ✅ Import the new component

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const loggedIn = { firstName: "Jan", lastName: "Eberwein" };

  return (
    <CopilotKit runtimeUrl="/api/copilotkit">
      <main className="flex h-screen w-full font-inter">
        <Sidebar user={loggedIn} />
        <div className="w-3/4">{children}</div>

        

        <CopilotPopup
          instructions="You are assisting the user in their financial analysis. Generate charts when the user asks about account balance, income, or expenses."
          labels={{
            title: "Quantum Bank AI",
            initial: "Hi! 👋 How can I assist you today?",
          }}
          shortcut="/"
        />
      </main>
    </CopilotKit>
  );
}
