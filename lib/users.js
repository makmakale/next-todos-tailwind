import {getServerSession} from 'next-auth'
import {authOptions} from '@/lib/auth'

export const currentUser = async () => {
  const session = await getServerSession(authOptions)
  return session?.user
}