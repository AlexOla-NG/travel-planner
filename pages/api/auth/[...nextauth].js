import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "@libs/clientPromise";
import NextAuth from "next-auth";
import EmailProvider from "next-auth/providers/email";
import FacebookProvider from "next-auth/providers/facebook";
import GoogleProvider from "next-auth/providers/google";

// NOTE: we can't change the session strategy to database while using only email/google providers because only jwt strategy is supported. Changing to database strategy redirects the user to signin page after verifying account with magic link
// see documentation 👉🏾: https://next-auth.js.org/configuration/nextjs#caveats

// if we want to use database strategy, we'll need to use the CredentialsProvider
// see solution 👉🏾: https://github.com/nextauthjs/next-auth/discussions/4394#discussioncomment-4785915

export const authOptions = {
  adapter: MongoDBAdapter(clientPromise),
  // Configure one or more authentication providers
  providers: [
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    // facebook provider is broken, please fix
    FacebookProvider({
      clientId: process.env.FACEBOOK_ID,
      clientSecret: process.env.FACEBOOK_SECRET,
    }),
  ],
  database: process.env.MONGO_DB_URI,
  session: {
    strategy: "jwt",

    // Seconds - How long until an idle session expires and is no longer valid.
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async jwt({ token, account }) {
      // Persist the OAuth access_token and or the user id to the token right after signin
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token }) {
      // Send properties to the client, like an access_token and user id from a provider.
      session.accessToken = token.accessToken;
      session.user.id = token.id;

      return session;
    },
  },
};

export default NextAuth(authOptions);
