import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@/firebase/config'
import { createUserDoc } from '../userDoc/create'
import { getUserDoc } from '../userDoc/get'

export interface ISignUpWithEmail {
	email: string
	password: string
}

export async function signUpWithEmail({ email, password }: ISignUpWithEmail) {
	const { user } = await createUserWithEmailAndPassword(auth, email, password)

	await createUserDoc({
		uid: user.uid,
		extraData: {
			name: user.displayName,
			email: user.email,
			avatar: user.photoURL,
		},
	})

	const userDoc = await getUserDoc(user.uid)

	return { ...user, ...userDoc }
}
