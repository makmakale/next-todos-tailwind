import Credentials from 'next-auth/providers/credentials'
import Google from 'next-auth/providers/google'
import {User} from "@/lib/database/sequelize";
import {LoginSchema} from "@/lib/form/validation";
import bcrypt from 'bcryptjs'

export const authOptions = {
  pages: {
    signIn: '/login',
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
    async session({session, token}) {
      const user = await User.findOne({where: {email: token.email}, raw: true})
      if (user && user.isActive) {
        session.user.id = user.id
        session.user.isAdmin = user.isAdmin
      }

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
      async authorize(credentials) {
        const isValid = await LoginSchema.isValid(credentials)
        if (!isValid) return null

        const {username, password} = credentials
        const user = await User.findOne({where: {username}})

        if (!user) throw Error('User not found')
        if (!user.password) return null

        const passwordMatch = await bcrypt.compare(password, user.password)
        if (!passwordMatch) {
          throw Error('Incorrect password')
        }
        if (!user.isActive) {
          throw Error('You account was disabled. PLease contact to admin.')
        }

        return user
      }
    }),
    Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    })
  ]
}
