import Credentials from 'next-auth/providers/credentials'
import Google from 'next-auth/providers/google'

export const authOptions = {
  pages: {
    signIn: '/auth/login',
  },
  session: {
    strategy: 'jwt'
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({token, account}) {
      if (account) {
        token.id = account.id
      }

      return token
    },
    async session({session}) {
      return session
    },
    async signIn({account, profile}) {
      if (account.provider === "google") {
        return profile.email_verified && profile.email.endsWith("@example.com")
      }
      return true // Do different verification for other providers that don't have `email_verified`
    }
  },
  providers: [
    Credentials({
      async authorize() {
        // Add logic here to look up the user from the credentials supplied
        const user = {id: "1", name: "Super Admin", email: "admin@example.com"}

        if (user) {
          // Any object returned will be saved in `user` property of the JWT
          return user
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null

          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      }
    }),
    Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    })
  ]
}
