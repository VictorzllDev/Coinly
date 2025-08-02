import { doc, getDoc } from 'firebase/firestore'
import { db } from '@/firebase/config'
import type { IUserData } from '@/types/auth'

export async function getUserDoc(uid: string) {
	const userDoc = await getDoc(doc(db, 'users', uid))
	if (!userDoc.exists()) throw new Error('User not found')

	return userDoc.data() as IUserData
}
