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
        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login/`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email_or_phone: credentials.username,
              password: credentials.password,
            }),
          });

          const data = await res.json();

          if (res.ok && data.token && data.user) {
            return {
              id: data.user.id.toString(),
              name: data.user.username || data.user.email || data.user.phone_number,
              email: data.user.email,
              phone_number: data.user.phone_number,
              token: data.token,
              isNewUser: false,
            };
          }
        } catch (error) {
          console.error("Auth error:", error);
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
      if (account?.provider === "google") {
        token.isNewUser = true;
        token.email = user.email;
        token.name = user.name;
      }

      if (user?.token) {
        token.accessToken = user.token;
        token.phone_number = user.phone_number;
        token.isNewUser = user.isNewUser;
      }

      return token;
    },

    async session({ session, token }) {
      session.accessToken = token.accessToken || null;
      session.user.phone_number = token.phone_number || null;
      session.user.isNewUser = token.isNewUser || false;
      return session;
    },

    async signIn() {
      return true;
    },
  },

  session: {
    strategy: "jwt",
  },

  pages: {
    signIn: "/auth/login",
    signUp: "/auth/register",
  },

  secret: process.env.NEXTAUTH_SECRET,
});
