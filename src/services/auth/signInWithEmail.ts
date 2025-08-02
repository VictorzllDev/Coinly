import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@/firebase/config'
import { getUserDoc } from '../userDoc/get'

export interface ISignInWithEmail {
	email: string
	password: string
}

export async function signInWithEmail({ email, password }: ISignInWithEmail) {
	const { user } = await signInWithEmailAndPassword(auth, email, password)
	const userDoc = await getUserDoc(user.uid)

	return { ...user, ...userDoc }
}
