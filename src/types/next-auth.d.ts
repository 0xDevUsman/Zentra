declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email?: string | null;
      image?: string | null;
    };
  }

  interface User {
    id: string;
    email: string;
  }

  interface JWT {
    _id: string;
    email: string;
  }
}
