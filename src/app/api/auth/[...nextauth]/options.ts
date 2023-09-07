import { NextAuthOptions } from "next-auth";
import GoogleProvider from 'next-auth/providers/google'

export const options: NextAuthOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID as string,
            clientSecret: process.env.GOOGLE_SECRET as string
        })
    ],
    callbacks: {
        async jwt({ token, account, profile, trigger, session }) {
            console.log({ token, account, profile, trigger, session })
            return token
        },
        async session({ session, token, user }: any) {
            console.log({ session, token, user })
            return session
        }
    }
}