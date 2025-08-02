import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore'
import { db } from '@/firebase/config'

interface CreateUserDoc {
	uid: string
	extraData?: Record<string, string | number | boolean | null>
}

export async function createUserDoc({ uid, extraData }: CreateUserDoc) {
	const userRef = doc(db, 'users', uid)
	const userSnap = await getDoc(userRef)

	if (!userSnap.exists()) {
		await setDoc(userRef, {
			createdAt: serverTimestamp(),
			...extraData,
		})
	}
}
