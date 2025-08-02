import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { connectDB } from "@/lib/db";
import { User } from "@/models/user";
import bcrypt from "bcrypt";

export const authOptions: NextAuthOptions = {
  providers: [
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
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID ?? "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET ?? "",
    }),
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
    async signIn({ user, account }) {
      if (!user?.email) return false;
      await connectDB();

      if (account?.provider !== "credentials") {
        const existingUser = await User.findOne({ email: user.email });
        if (!existingUser) {
          try {
            const newUser = new User({
              email: user.email,
              provider: account?.provider,
            });
            await newUser.save();
          } catch (error) {
            console.error("OAuth signup error:", error);
            return false;
          }
        }
      }
      return true;
    },

    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },

    async session({ session, token }) {
      if (token?.id && session.user) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
      }
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
};
