import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import { getCurrentUserProfile } from "@/lib/User";

interface authResult {
  tokenType: string;
  accessToken: string;
  expiresIn: number;
  refreshToken: string;
}

const authenticateUser = async (
  email: string,
  password: string
): Promise<authResult | null> => {
  const BASE_URL = process.env.BACKEND_BASE_URL;
  try {
    const res = await fetch(BASE_URL + "/login", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      return null;
    }

    const data: authResult = await res.json();

    return data;
  } catch (err) {
    console.error("Authentication error:", err);
    return null;
  }
};

const refreshToken = async (
  accessToken: string,
  refreshToken: string
): Promise<authResult | null> => {
  const BASE_URL = process.env.BACKEND_BASE_URL;
  try {
    const res = await fetch(BASE_URL + "/refresh", {
      method: "POST",
      headers: { "Content-type": "application/json", "Authorization": `Bearer ${accessToken}` },
      body: JSON.stringify({ refreshToken }),
    });

    if (!res.ok) {
      console.error("Refresh failed: ", await res.text());
      return null;
    }

    const data: authResult = await res.json();


    return data;
  } catch (err) {
    console.error("Authentication error:", err);
    return null;
  }
};

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const result = await authenticateUser(
          credentials.email,
          credentials.password
        );

        if (!result) {
          return null;
        }

        return {
          id: credentials.email,
          name: credentials.email,
          email: credentials.email,
          tokenType: result.tokenType,
          accessToken: result.accessToken,
          expiresIn: result.expiresIn,
          refreshToken: result.refreshToken,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.expiresIn = Date.now() + user.expiresIn! * 1000;
        return token;
      }

      if (token.expiresIn && Date.now() < token.expiresIn) {
        return token;
      }

      try {
        const refreshed = await refreshToken(token.accessToken as string, token.refreshToken as string);

        if (!refreshed) throw new Error("Refresh failed");

        token.accessToken = refreshed.accessToken;
        token.refreshToken = refreshed.refreshToken;
        token.expiresIn = Date.now() + refreshed.expiresIn * 1000;

        return token;
      } catch (error) {
        console.error(error);
        return token;
      }
    },

    async session({ session, token }) {
      session.accessToken = token.accessToken as string;
      session.refreshToken = token.refreshToken as string;
      session.expiresIn = token.expiresIn as number;

      const currentUser = await getCurrentUserProfile(session.accessToken);

      session.user.id = currentUser.id;
      session.user.bio = currentUser.bio;
      session.user.email = currentUser.email;
      session.user.profilePictureUrl = currentUser.profilePictureUrl;

      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
