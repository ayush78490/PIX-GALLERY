import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./prisma";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  pages: {
    signIn: "/auth/signin",
  },
  debug: true,
  logger: {
    error(code, ...message) {
      console.error("[auth][logger][error]", code, ...message);
    },
    warn(code, ...message) {
      console.warn("[auth][logger][warn]", code, ...message);
    },
    debug(code, ...message) {
      console.log("[auth][logger][debug]", code, ...message);
    },
  },
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      allowDangerousEmailAccountLinking: true,
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async redirect({ url, baseUrl }) {
      const frontendUrl = process.env.FRONTEND_URL ?? "http://localhost:3000";

      if (url === baseUrl || url === `${baseUrl}/`) {
        return `${frontendUrl}/profile`;
      }
      if (url.startsWith(frontendUrl)) {
        return url;
      }
      if (url.startsWith("/")) {
        return `${baseUrl}${url}`;
      }
      return baseUrl;
    },
    async jwt({ token, user, account }) {
      try {
        if (user) {
          token.id = user.id;
          token.role = (user as { role?: string }).role;
        }
        if (account?.provider === "google" && token.email) {
          const dbUser = await prisma.user.findUnique({
            where: { email: token.email },
          });
          if (dbUser) {
            token.id = dbUser.id;
            token.role = dbUser.role;
          }
        }
        return token;
      } catch (error) {
        console.error("[auth][jwt][error]", error);
        throw error;
      }
    },
    async session({ session, token }) {
      try {
        if (token?.id) {
          session.user.id = token.id as string;
          session.user.role = token.role as string;
        }
        return session;
      } catch (error) {
        console.error("[auth][session][error]", error);
        throw error;
      }
    },
  },
});
