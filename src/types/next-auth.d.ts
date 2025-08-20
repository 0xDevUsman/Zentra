import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email?: string | null;
      image?: string | null;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    email: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;      // <-- use `id`, not `_id`
    email: string;
  }
}
