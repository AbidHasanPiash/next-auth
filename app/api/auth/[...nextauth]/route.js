import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import AuthConfig from "@/config/auth";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: { label: "Email", type: "email", placeholder: "Email" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Password",
        },
      },
      async authorize(credentials, req) {
        // You need to provide your own logic here that takes the credentials
        // submitted and returns either a object representing a user or value
        // that is false/null if the credentials are invalid.
        // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
        // You can also use the `req` object to obtain additional parameters
        // (i.e., the request IP address)
        if (!credentials || !credentials.email || !credentials.password) {
          return null;
        }

        const res = await fetch(AuthConfig.loginEndpoint, {
          method: "POST",
          body: JSON.stringify(credentials),
          headers: { "Content-Type": "application/json" },
        });
        const user = await res.json();
        // If no error and we have user data, return it
        if (res.ok && user) {
          const modifiedUser = {
            name: user?.userData?.username,
            email: user?.userData?.email,
            image: user?.userData?.image,
            accessToken: user?.accessToken,
          };
          return modifiedUser;
        }
        // Return null if user data could not be retrieved
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ session, token, user }) {
      // pass in user sessionToken to token
      if (user) {
        return {
          ...token,
          accessToken: user.accessToken,
        };
      }
      return token;
    },
    async session({ session, token, user }) {
      // pass in token sessionToken to session
      session = {
        ...session,
        user: {
          ...session.user,
          accessToken: token.accessToken,
        },
      };
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error", // Error code passed in query string as ?error=
    // signOut: '/auth/signout',
    // verifyRequest: '/auth/verify-request', // (used for check email message)
    // newUser: '/auth/new-user'
  },
  secret: process.env.NEXTAUTH_SECRET,
};
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
