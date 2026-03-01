import { type AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const adminEmail = process.env.ADMIN_EMAIL;
        const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH;
        const adminPassword = process.env.ADMIN_PASSWORD;

        if (!credentials?.email || !credentials?.password) return null;
        if (!adminEmail) return null;
        if (credentials.email !== adminEmail) return null;

        let isValid = false;
        if (adminPasswordHash) {
          isValid = await bcrypt.compare(credentials.password, adminPasswordHash);
        } else if (adminPassword) {
          isValid = credentials.password === adminPassword;
        }

        if (!isValid) return null;

        return {
          id: "1",
          email: adminEmail,
          name: "Zee",
        };
      },
    }),
  ],
  session: { strategy: "jwt" },
  pages: {
    signIn: "/admin/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
