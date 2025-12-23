import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    accessToken: string | null;
    refreshToken: string | null;
    expiresIn: number | null;
    user: {
      id?: string | null;
      email?: string | null;
      bio?: string | null;
      profilePictureUrl?: string | null;
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
