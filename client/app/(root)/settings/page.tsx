"use client";

import React, { useState } from "react";
import { useCopilotAction, useCopilotReadable } from "@copilotkit/react-core";
import HeaderBox from "@/components/HeaderBox";

const Page = () => {
    const [receiveNotifications, setReceiveNotifications] = useState(false);

    // Function to handle checkbox toggle
    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setReceiveNotifications(event.target.checked);
        console.log("Receive Notifications:", event.target.checked); // Logs the updated state
    };

    // Sync state with CopilotKit
    useCopilotReadable({
        description: "Specifies whether the user opts in or out of receiving notifications",
        value: receiveNotifications,
    });

    // Define Copilot action to update the variable
    useCopilotAction({
        name: "updateReceiveNotifications",
        description: "Update the opt-in or opt-out status for receiving notifications",
        parameters: [
            {
                name: "notificationsEnabled",
                type: "boolean",
                description: "Set to true to enable notifications, false to disable",
                required: true,
            },
        ],
        handler: async ({ notificationsEnabled }: { notificationsEnabled: boolean }) => {
            setReceiveNotifications(notificationsEnabled);
            console.log("Receive Notifications Updated:", notificationsEnabled); // Log the update
        },
    });

    return (

        <div className="settings-page">
            <div className="settings-header">
                <HeaderBox title="Settings" subtext="" />
            </div>
            <div className="flex items-center gap-4">
                <input
                    type="checkbox"
                    id="receiveNotifications"
                    checked={receiveNotifications}
                    onChange={handleCheckboxChange}
                    className="w-5 h-5 cursor-pointer"
                />
                <label
                    htmlFor="receiveNotifications"
                    className="text-lg cursor-pointer"
                >
                    Receive Notifications
                </label>
            </div>
            {/* Display the current state */}
            <p className="mt-4">
                Notifications are{" "}
                <span className="font-bold">
                    {receiveNotifications ? "enabled" : "disabled"}
                </span>.
            </p>
        </div>
    );
};

export default Page;
