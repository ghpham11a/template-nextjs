

import type { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { getCurrentUser, signIn } from 'aws-amplify/auth'

export const options: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: {
                    label: "Username:",
                    type: "text",
                    placeholder: "your-cool-username"
                },
                password: {
                    label: "Password:",
                    type: "password",
                    placeholder: "your-awesome-password"
                }
            },
            async authorize(credentials) {
                // This is where you need to retrieve user data 
                // to verify with credentials
                // Docs: https://next-auth.js.org/configuration/providers/credentials

                try {
                    const authStatus = await signIn({
                        username: credentials?.username ?? "",
                        password: credentials?.password ?? "",
                    })

                    if (authStatus.isSignedIn === true) {
                        const user = await getCurrentUser()
                        return { id: user.userId, username: user.username }
                    }
                    return null
                } catch (error) {
                    console.error("error", error)
                    return null
                }
            }
        })
    ],
    secret: process.env.NEXTAUTH_SECRET,
    // pages: {
    //     signIn: '/auth/signin', // Custom sign-in page
    // }
}
