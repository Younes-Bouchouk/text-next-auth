// lib/auth.ts
import NextAuth from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from './prisma';
import GoogleProvider from 'next-auth/providers/google';

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }),
  ],
  secret: process.env.AUTH_SECRET,
  // session: { strategy: 'jwt' },

  // SUPPRIME CECI :
  pages: { signIn: "/login" },


  // callbacks: {
  //   async redirect({ url, baseUrl }) {
  //     return url.startsWith('/') ? `${baseUrl}${url}` : baseUrl;
  //   },
  // },
});