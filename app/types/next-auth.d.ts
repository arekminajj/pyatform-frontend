import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    accessToken: string | null;
    refreshToken: string | null;
    expiresIn: number | null;
    user: {
      email?: string | null;
      name?: string | null;
    };
  }

  interface User {
    accessToken: string | null;
    refreshToken: string | null;
    expiresIn: number | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken: string | null;
    refreshToken: string | null;
    expiresIn: number | null;
  }
}
