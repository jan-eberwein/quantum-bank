// client/app/layout.tsx
import { ReactNode } from "react";
import Sidebar from "../components/Layout/Sidebar";
import "../styles/globals.css"; // Import global styles
import { UserProvider } from "../components/Layout/UserContext";
import { CopilotKit } from "@copilotkit/react-core";

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
              </CopilotKit>
            </main>
          </div>
        </UserProvider>
      </body>
    </html>
  );
};

export default RootLayout;