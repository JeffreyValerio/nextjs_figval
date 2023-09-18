'use client'

import { User } from "@/interfaces";
import { useReducer, useEffect } from "react";
import { AuthContext, authReducer } from ".";

import Cookies from 'js-cookie'

import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";

import { fetcher } from "@/libs";

export interface AuthState {
    isLoggedIn: boolean;
    user?: User
}

interface UserRegister {
    hasError: boolean;
    message?: string
}

const AUTH_INITIAL_STATE: AuthState = {
    isLoggedIn: false,
    user: undefined,
}

export const AuthProvider = ({ children }: any) => {
    const [state, dispatch] = useReducer(authReducer, AUTH_INITIAL_STATE)
    const { data, status } = useSession()
    const router = useRouter()

    useEffect(() => {
        if (status === 'authenticated') {
            dispatch({ type: '[Auth] - Login', payload: data?.user as User })
        }
    }, [status, data])

    const loginUser = async (identifier: string, password: string): Promise<boolean> => {
        try {
            const data = await fetcher(`${process.env.NEXT_PUBLIC_STRAPI_URL}/auth/local`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        identifier: identifier,
                        password: password,
                    }),
                }
            )

            const { jwt, user } = data
            Cookies.set('jwt', jwt)
            dispatch({ type: '[Auth] - Login', payload: user })
            return true
        } catch (error) {
            return false
        }
    }

    const registerUser = async (username: string, email: string, password: string): Promise<UserRegister> => {

        try {
            const data = await fetcher(`${process.env.NEXT_PUBLIC_STRAPI_URL}/auth/local/register`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        username: username,
                        email: email.toLowerCase(),
                        password: password,
                    })
                }
            )

            const { jwt, user } = data
            Cookies.set('jwt', jwt)
            dispatch({ type: '[Auth] - Login', payload: user })

            return {
                hasError: false
            }

        } catch (error: any) {
            return {
                hasError: true,
                message: error.data.message
            }
        }
    }

    const logout = () => {
        Cookies.remove('user')
        Cookies.remove('name')
        Cookies.remove('lastname')
        Cookies.remove('address')
        Cookies.remove('address2')
        Cookies.remove('zip')
        Cookies.remove('city')
        Cookies.remove('country')
        Cookies.remove('telephone')
        Cookies.remove('jwt')

        signOut()
    }

    return (
        <AuthContext.Provider value={{
            ...state,
            // METHODS
            loginUser,
            registerUser,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    )
} 