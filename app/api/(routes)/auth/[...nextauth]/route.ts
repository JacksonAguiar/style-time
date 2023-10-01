import NextAuth, { getServerSession, type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import prisma from "@/config/prisma";
import { compare } from "bcrypt";

export const authOptions: NextAuthOptions = {
  // pages/api/auth/[...nextauth].ts

  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (trigger === "update") {
        if (session?.completeAuth) {
          token.completeAuth = session.completeAuth;
        }
        if (session.companieId) {
          token.companieId = session.companieId;
        }
        // Note, that `session` can be any arbitrary object, remember to validate it!
      }
      if (user) {
        token.id = user.id;
        token.registerStep = user.registerStep;
        token.subscribed = user.subscribed;
        token.provider = user.provider;
        token.companieId = user.companieId;
        token.companieName = user.companieName;
      }
      return token;
    },
    async signIn({ credentials, email, profile, account, user }) {
      if (account?.provider == "google") {
        const _email = user.email ?? "";
        console.log(credentials);

        var data: any = await prisma.user.findUnique({
          where: { email: _email },
          select: {
            name: true,
            id: true,
            companieId: true,
            registerStep: true,
            password: true,
            provider: true,
            Company: { select: { name: true } },
          },
        });

        if (!data)
          data = await prisma.user.create({
            data: {
              email: _email,
              provider: user.provider,
              completeAuth: true,
            },
          });
        var companieName = data?.Companie?.name ?? "";

        const { id, registerStep, name, companieId } = data;

        user.id = id;
        user.name = name;
        user.companieId = companieId ?? "";
        user.registerStep = registerStep;
        user.provider = account?.provider;
        user.companieName = companieName;
      }

      return true;
    },
    session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id;
        session.user.registerStep = token.registerStep;
        session.user.subscribed = token.subscribed;
        session.user.provider = token.provider;
        session.user.companieId = token.companieId;
        session.user.companieName = token.companieName;
      }
      return session;
    },
  },

  pages: {
    signIn: "/signin",
    error: "/signin",
  },

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
    CredentialsProvider({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials): Promise<any> {
        const { email, password } = credentials ?? {};

        if (!email || !password) {
          throw new Error("Missing username or password");
        }
        let user: any = await prisma.user.findUnique({
          where: {
            email,
          },
          select: {
            name: true,
            id: true,
            companieId: true,
            registerStep: true,
            password: true,
            provider: true,
            Company: { select: { name: true } },
          },
        });

        if (!user) {
          throw new Error("Account not found");
        }
        const match = await compare(password, user?.password);

        if (!match) throw new Error("Invalid password");

        user.companieName = user?.Companie?.name ?? "";

        delete user?.Companie;

        return user;
      },
    }),
  ],
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
