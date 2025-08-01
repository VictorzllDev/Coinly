import type { UserCredential } from 'firebase/auth'
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore'
import { useCallback } from 'react'
import { db } from '@/firebase/config'

export function useCreateUserDocument() {
	const createUserDoc = useCallback(
		async (user: UserCredential['user'], extraData?: Record<string, string | number | boolean | null>) => {
			if (!user?.uid) return

			const userRef = doc(db, 'users', user.uid)
			const userSnap = await getDoc(userRef)

			if (!userSnap.exists()) {
				await setDoc(userRef, {
					email: user.email,
					createdAt: serverTimestamp(),
					...extraData,
				})
			}
		},
		[],
	)

	return { createUserDoc }
}
