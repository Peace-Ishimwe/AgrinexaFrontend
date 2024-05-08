import React from "react";
import { AuthProvider } from "./AuthContext";
import { FarmProvider } from "./FarmContext";

interface props {
    children: React.ReactNode;
}

const ContextProviders: React.FC<props> = ({ children }) => {
    return (
        <AuthProvider>
            <FarmProvider>
                {children}
            </FarmProvider>
        </AuthProvider>
    )
}

export default ContextProviders;