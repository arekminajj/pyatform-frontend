import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

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
        if (user.expiresIn)
          token.expiresIn = Date.now() + user.expiresIn * 1000;
      }
      return token;
    },

    async session({ session, token }) {
      session.accessToken = token.accessToken as string;
      session.refreshToken = token.refreshToken as string;
      session.expiresIn = token.expiresIn as number;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
