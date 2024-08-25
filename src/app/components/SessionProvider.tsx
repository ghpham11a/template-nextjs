"use client";

import { Amplify } from "aws-amplify";
import { SessionProvider } from "next-auth/react";

try {
Amplify.configure({
    Auth: {
    Cognito: {
        userPoolClientId: process.env.COGNITO_CLIENT_ID ?? "",
        userPoolId: process.env.COGNITO_POOL_ID ?? "",
        identityPoolId: process.env.COGNITO_IDENTITY_POOL_ID ?? "",
        loginWith: {
            email: true,
        },
        signUpVerificationMethod: "code",
        userAttributes: {
          email: {
            required: true,
          },
        },
        allowGuestAccess: true,
        passwordFormat: {
          minLength: 8,
          requireLowercase: true,
          requireUppercase: true,
          requireNumbers: true,
          requireSpecialCharacters: true,
        },
    },
    },
}, {ssr: true});
console.log("Amplify configured")
} catch (error) {
console.error("Amplify error", error);
}

export default SessionProvider