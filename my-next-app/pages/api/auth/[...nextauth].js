// pages/api/auth/[...nextauth].js

import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Email or Phone", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login/`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email_or_phone: credentials.username,
            password: credentials.password,
          }),
        });

        const data = await res.json();
        if (res.ok && data.token) {
          return {
            id: data.user.id,
            name: data.user.email || data.user.phone_number,
            email: data.user.email,
            token: data.token,
            isNewUser: false, // For credentials, never new
          };
        }

        return null;
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  callbacks: {
    async jwt({ token, account, user }) {
      // Set isNewUser only for Google logins
      if (account && account.provider === "google") {
        token.isNewUser = true;
      }

      if (user?.token) {
        token.accessToken = user.token;
        token.user = user;
      }

      return token;
    },

    async session({ session, token }) {
      session.accessToken = token.accessToken || null;
      session.user = token.user || session.user;
      session.user.isNewUser = token.isNewUser || false;
      return session;
    },
  },

  session: {
    strategy: "jwt",
  },

  pages: {
    signIn: "/auth/login",
  },

  secret: process.env.NEXTAUTH_SECRET,
  debug: true,
});
