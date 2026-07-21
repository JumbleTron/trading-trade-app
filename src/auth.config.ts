import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  providers: [],
  callbacks: {
    authorized({ auth, request }) {
      const pathname = request.nextUrl.pathname;
      const isPublicRoute =
        pathname === "/" || pathname === "/login" || pathname === "/register";

      return isPublicRoute || !!auth;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as { role?: string }).role || "user";
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        (session.user as typeof session.user & { role?: string }).role =
          token.role as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.AUTH_SECRET,
} satisfies NextAuthConfig;
