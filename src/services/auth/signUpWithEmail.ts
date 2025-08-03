import { createUserWithEmailAndPassword } from 'firebase/auth'
import { env } from '@/env'
import { auth } from '@/firebase/config'
import { createUserDoc } from '../userDoc/create'
import { getUserDoc } from '../userDoc/get'

export interface ISignUpWithEmail {
	name: string
	email: string
	password: string
}

export async function signUpWithEmail({ name, email, password }: ISignUpWithEmail) {
	const { user } = await createUserWithEmailAndPassword(auth, email, password)

	await createUserDoc({
		uid: user.uid,
		extraData: {
			name: name,
			email: user.email,
			avatar: env.VITE_DEFAULT_AVATAR_URL,
		},
	})

	const userDoc = await getUserDoc(user.uid)

	return { ...user, ...userDoc }
}
