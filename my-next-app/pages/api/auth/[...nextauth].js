// pages/api/auth/[...nextauth].js
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Email or Phone", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        console.log("Attempting login with:", credentials.username);
        
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login/`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email_or_phone: credentials.username,
            password: credentials.password
          }),
        });

        console.log("Response status:", res.status);
        console.log("Response ok:", res.ok);
        
        const data = await res.json();
        console.log("Response data:", data);

        if (res.ok && data.token) {
          console.log("Login successful, returning user data");
          return {
            id: data.user.id,
            name: data.user.email || data.user.phone_number,
            email: data.user.email,
            token: data.token,
          };
        }

        console.log("Login failed");
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.token;
        token.user = user;
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.user = token.user;
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
  debug: true, // Enable debug mode
});