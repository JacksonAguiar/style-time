import NextAuth, { AuthOptions, User } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import SessionApi from "@/api/endpoints/session";

const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
    CredentialsProvider({
      name: "SignIn",
      credentials: {
        email: {
          label: "Email",
          type: "email",
        },
        password: {
          label: "Email",
          type: "email",
        },
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }
        const session = new SessionApi();
        const response = await session.signIn({
          email: credentials.email,
          pass: credentials.password,
        });

        if (response) {
          return response.json();
        }
        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
};
export default NextAuth(authOptions);
