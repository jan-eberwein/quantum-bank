// client/app/layout.tsx
import { ReactNode } from "react";
import Sidebar from "../components/Layout/Sidebar";
import "../styles/globals.css"; // Import global styles
import { UserProvider } from "../components/Layout/UserContext";
import { CopilotKit } from "@copilotkit/react-core";
import "@copilotkit/react-ui/styles.css";
import { CopilotPopup } from "@copilotkit/react-ui";

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="en">
      <body>
        <UserProvider>
          <div className="flex h-screen">
            <Sidebar />
            <main className="flex-1 p-4">
              <CopilotKit runtimeUrl="/api/copilotkit">
                {children}
                <CopilotPopup
                  instructions={
                    "You are assisting the user as best as you can. Answer in the best way possible given the data you have."
                  }
                  labels={{
                    title: "Popup Assistant",
                    initial: "Need any help?",
                  }}
                />
              </CopilotKit>
            </main>
          </div>
        </UserProvider>
      </body>
    </html>
  );
};

export default RootLayout;
