import NextAuth from "next-auth"
import AppleProvider from "next-auth/providers/apple"
import EmailProvider from "next-auth/providers/email";
import FacebookProvider from "next-auth/providers/facebook"
import GoogleProvider from "next-auth/providers/google"
import clientPromise from "@/libs/clientPromise";
import { MongoDBAdapter } from "@auth/mongodb-adapter";

// TODO: stopped here
// fix email provider error: username & password not accepted

export const authOptions = {
  adapter: MongoDBAdapter(clientPromise),
  // Configure one or more authentication providers
  providers: [
    EmailProvider({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_ID,
      clientSecret: process.env.FACEBOOK_SECRET,
    }),
  ],
  database: process.env.MONGO_DB_URI,
  // session: {
  //   jwt: true,
  // },
  // jwt: {
  //   secret: process.env.JWT_SECRET,
  // }
}

export default NextAuth(authOptions)