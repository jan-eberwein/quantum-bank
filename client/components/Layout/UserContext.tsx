// client/components/Layout/UserContext.tsx
"use client";

import { createContext, useContext, useReducer, ReactNode } from "react";

type User = {
    id: string;
    name: string;
    email: string;
};

type State = {
    user: User | null;
};

type Action = { type: "SET_USER"; payload: User } | { type: "LOGOUT" };

const initialState: State = { user: null };

const UserContext = createContext<{ state: State; dispatch: React.Dispatch<Action> } | undefined>(undefined);

function userReducer(state: State, action: Action): State {
    switch (action.type) {
        case "SET_USER":
            return { user: action.payload };
        case "LOGOUT":
            return { user: null };
        default:
            return state;
    }
}

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(userReducer, initialState);
    return <UserContext.Provider value={{ state, dispatch }}>{children}</UserContext.Provider>;
};

export const useUserContext = () => {
    const context = useContext(UserContext);
    if (!context) throw new Error("useUserContext must be used within a UserProvider");
    return context;
};
