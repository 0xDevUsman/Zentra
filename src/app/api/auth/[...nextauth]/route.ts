import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { connectDB } from "@/lib/db";
import { User } from "@/models/user";
import bcrypt from "bcrypt";

// Extend the Session type to include id on user
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email?: string | null;
      image?: string | null;
    };
  }
}

// -------------------
// Fully Typed Options
// -------------------
export const authOptions: NextAuthOptions = {
  providers: [
    // ✅ Credentials Provider
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await connectDB();

        const email = credentials?.email?.toLowerCase().trim();
        const password = credentials?.password;

        if (!email || !password) return null;

        const user = await User.findOne({ email }).select("+password");
        if (!user) throw new Error("Invalid email or password.");

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) throw new Error("Invalid email or password.");

        return { id: user.id.toString(), email: user.email };
      },
    }),

    // ✅ GitHub Provider
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID ?? "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET ?? "",
    }),

    // ✅ Google Provider
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],

  pages: {
    signIn: "/signin",
  },

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (token?.id && session.user) {
        session.user!.id = token.id as string;
        session.user!.email = token.email as string;
      }
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
};

// ---------------------------
// Required for App Router API
// ---------------------------
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
