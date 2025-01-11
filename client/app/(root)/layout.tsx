import Sidebar from "@/components/Sidebar";
import {CopilotPopup} from "@copilotkit/react-ui"; // Import CopilotPopup
import {CopilotKit} from "@copilotkit/react-core";
import "@copilotkit/react-ui/styles.css"; // Ensure styles are imported

export default function RootLayout({
                                       children,
                                   }: Readonly<{ children: React.ReactNode }>) {
    const loggedIn = {firstName: "Jan", lastName: "Eberwein"};

    return (
        <main className="flex h-screen w-full font-inter">
            <CopilotKit runtimeUrl="/api/copilotkit">
                <Sidebar user={loggedIn}/>
                {children}
                {/* Add CopilotPopup */}
                <CopilotPopup
                    instructions={"You are assisting the user as best as you can. Answer in the best way possible given the data you have."}
                    labels={{
                        title: "Your Assistant",
                        initial: "Hi! 👋 How can I assist you today?",
                    }}
                    shortcut="/"
                />
            </CopilotKit>
        </main>
    );
}
