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
        if (!credentials?.username || !credentials?.password) {
          throw new Error("Email/phone and password are required");
        }

        try {
          const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || process.env.API_BASE_URL;
          if (!apiUrl) {
            throw new Error("API base URL not configured");
          }

          const res = await fetch(`${apiUrl}/auth/login/`, {
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
          } else {
            console.error("Login failed:", data.errors || data.message);
            throw new Error(data.message || "Invalid credentials");
          }

        } catch (error) {
          console.error("Auth error:", error);
          // Re-throw with a user-friendly message
          if (error.message.includes("fetch")) {
            throw new Error("Unable to connect to authentication server");
          }
          throw error;
        }
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  callbacks: {
    async jwt({ token, account, user }) {
      // Handle Google OAuth
      if (account?.provider === "google" && user) {
        return {
          ...token,
          isNewUser: true,
          email: user.email,
          name: user.name,
          accessToken: null, // Will be set after backend registration
        };
      }

      // Handle credentials login
      if (user?.token) {
        return {
          ...token,
          accessToken: user.token,
          phone_number: user.phone_number,
          isNewUser: user.isNewUser || false,
        };
      }

      return token;
    },

    async session({ session, token }) {
      return {
        ...session,
        accessToken: token.accessToken || null,
        user: {
          ...session.user,
          phone_number: token.phone_number || null,
          isNewUser: token.isNewUser || false,
        }
      };
    },

    async signIn() {
      // Allow all sign-ins - handle validation in the authorize function
      return true;
    },

    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
  },

  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 24 hours
  },

  pages: {
    signIn: "/auth/login",
    signUp: "/auth/register",
    error: "/auth/error",
  },

  secret: process.env.NEXTAUTH_SECRET,

  debug: process.env.NODE_ENV === "development",
});