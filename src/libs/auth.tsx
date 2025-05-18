import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials";
import { signInSchema } from "~/schemas/sign-in"
// Your own logic for dealing with plaintext password strings; be careful!
// import { saltAndHashPassword } from "~/utils/password"
// import { getUserFromDb } from "~/utils/db"

import axios from "axios"
 
export const {
  handlers: { GET, POST },
  signIn,
  signOut,
  auth
} = NextAuth({
  providers: [
    Credentials({
      /*
       * As we are using our own Sign-in page, we do not need to change
       * username or password attributes manually in following credentials object.
       */
      name: "Credentials",
      credentials: {
        username: {
          label: 'Username',
          type: 'text'
        },
        password: {
          label: 'Password',
          type: 'password',
        }
      },
      /**
       * Verify the username and password supplied against a database or service.
       * The function should return a user object if the credentials are valid, or null if not.
       * The user object should contain at least the following properties:
       * - id: a unique identifier for the user
       * - name: the name of the user
       * - email: the email address of the user
       * - role: the role of the user (e.g. "Admin", "User")
       * @param {Object} credentials Contains the username and password supplied by the user.
       * @returns {Promise<Object | null>} A user object if the credentials are valid, or null if not.
       */
      async authorize(credentials) {
        const { username, password } = credentials;

        try {
          const response = await axios.post(`${process.env.API_URL}/login`, { username, password });
          const { data } = response;

          if (response.status === 401) {
            throw new Error(data.message);
          }

          if (response.status === 200) {
            return data;
          }

          return null;
        } catch (error: any) {
          throw new Error(error.message);
        }
      }
    }),
  ],
  secret: process.env.AUTH_SECRET,
  // ** Please refer to https://next-auth.js.org/configuration/options#session for more `session` options
  session: {
    /*
     * Choose how you want to save the user session.
     * The default is `jwt`, an encrypted JWT (JWE) stored in the session cookie.
     * If you use an `adapter` however, NextAuth default it to `database` instead.
     * You can still force a JWT session by explicitly defining `jwt`.
     * When using `database`, the session cookie will only contain a `sessionToken` value,
     * which is used to look up the session in the database.
     * If you use a custom credentials provider, user accounts will not be persisted in a database by NextAuth.js (even if one is configured).
     * The option to use JSON Web Tokens for session tokens must be enabled to use a custom credentials provider.
     */
    strategy: 'jwt',

    // ** Seconds - How long until an idle session expires and is no longer valid
    maxAge: 10 // 24 * 60 * 60 * 30 // ** 30 days
  },

  // ** Please refer to https://next-auth.js.org/configuration/options#pages for more `pages` options
  // pages: {
  //   signIn: '/login'
  // },
  // ** Please refer to https://next-auth.js.org/configuration/options#callbacks for more `callbacks` options
  callbacks: {
    /*
     * While using `jwt` as a strategy, `jwt()` callback will be called before
     * the `session()` callback. So we have to add custom parameters in `token`
     * via `jwt()` callback to make them accessible in the `session()` callback
     */
    async jwt({ token, user }) {
      if (user) {
        /*
         * For adding custom parameters to user in session, we first need to add those parameters
         * in token which then will be available in the `session()` callback
         */
        // @ts-ignore
        token = user
      }

      return token
    },
    async session({ session, token }) {
      if (session.user) {
        // ** Add custom params to user in session which are added in `jwt()` callback via `token` parameter
        // @ts-ignore
        session = token
      }

      return session
    },
  }
})