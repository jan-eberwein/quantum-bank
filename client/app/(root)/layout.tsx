import Sidebar from "@/components/Sidebar";
import { CopilotPopup } from "@copilotkit/react-ui"; // Import CopilotPopup
import "@copilotkit/react-ui/styles.css"; // Ensure styles are imported

export default function RootLayout({
                                     children,
                                   }: Readonly<{ children: React.ReactNode }>) {
  const loggedIn = { firstName: "Jan", lastName: "Eberwein" };

  return (
      <main className="flex h-screen w-full font-inter">
        <Sidebar user={loggedIn} />
        {children}
        {/* Add CopilotPopup */}
        <CopilotPopup
            labels={{
              title: "Your Assistant",
              initial: "Hi! 👋 How can I assist you today?",
            }}
            shortcut="/"
        />
      </main>
  );
}
