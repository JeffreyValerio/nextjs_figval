import { fetcher, oAuthProviders } from "@/libs";
import { NextAuthOptions } from "next-auth";
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'

interface userSession {
    session: any,
    token: any,
    user: any
}

export const options: NextAuthOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: '/account/login',
        newUser: '/account/register',
    },
    providers: [
        CredentialsProvider({
            name: 'Custom login',
            credentials: {
                identifier: {
                    label: 'Correo:',
                    type: 'email:',
                    placeholder: 'SeverusSnape@hogwarts.com'
                },
                password: {
                    label: 'Contraseña',
                    type: 'password',
                    placeholder: '********'
                },
            },
            async authorize(credentials:any) {
                const res = await fetcher(`${process.env.NEXT_PUBLIC_STRAPI_URL}/auth/local`,
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            identifier: credentials?.identifier,
                            password: credentials?.password,
                        }),
                    }
                )

                const { user } = res

                if (user) return user

                return null
            }
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_ID as string,
            clientSecret: process.env.GOOGLE_SECRET as string
        })
    ],
    callbacks: {
        async jwt({ token, account, user, profile, trigger, session }) {
            if (account) {
                token.accessToken = account.id_token
                switch (account.type) {
                    case 'oauth':
                        token.user = await oAuthProviders(user)
                        break

                    case 'credentials':
                        token.user = user
                        break
                }
            }
            return token
        },
        async session({ session, token, user }: userSession) {
            session.accessToken = token.accessToken
            session.user = token.user as any
            return session
        }
    }
}