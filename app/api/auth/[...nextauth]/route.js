import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { Pool } from 'pg';
const pool = new Pool({ connectionString: process.env.POSTGRES_URL });
import { createAdapter } from "@next-auth/vercel-postgres-adapter";
import { VercelKV } from '@vercel/kv';
import bcrypt from 'bcryptjs';

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "text" },
        password: {  label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          const { rows: users } = await pool.query(
          'SELECT * FROM users WHERE email = $1', 
          [credentials.email]
        );

          if (users.length === 0) {
            return null;
          }

          const user = users[0];
          const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password);

          if (!isPasswordCorrect) {
            return null;
          }

          return { id: user.id, email: user.email, name: user.name, role: user.role };
        } catch (error) {
          console.error("Authorize error:", error);
          return null;
        }
      }
    })
  ],
  adapter: createAdapter({
    url: process.env.POSTGRES_URL,
  }),
  session: {
    strategy: 'jwt',
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
    maxAge: 60 * 60 * 24 * 30, // 30 days
  },
  useSecureCookies: process.env.NODE_ENV === 'production',
  cookies: {
    sessionToken: {
      name: `__Secure-next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production',
      },
    },
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
      return session;
    },
  },
  pages: {
    signIn: '/login',
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
