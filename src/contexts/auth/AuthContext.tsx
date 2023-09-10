'use client'

import { User } from "@/interfaces";
import { createContext } from "react";

interface ContextProps {
    isLoggedIn: boolean;
    user?: User;

    loginUser: (identifier: string, password: string) => Promise<boolean>;
    registerUser: (username: string, email: string, password: string) => Promise<{ hasError: boolean; message?: string }>;
    logout: () => void
}

export const AuthContext = createContext({} as ContextProps)