import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { auth } from '@/firebase/config'
import { createUserDoc } from '../userDoc/create'
import { getUserDoc } from '../userDoc/get'

export async function signInWithGoogle() {
	const { user } = await signInWithPopup(
		auth,
		new GoogleAuthProvider().setCustomParameters({ promp: 'select_account' }),
	)

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
