import type { UserCredential } from 'firebase/auth'
import { deleteDoc, doc } from 'firebase/firestore'
import { db } from '@/firebase/config'

interface DeleteTransaction {
	user: UserCredential['user']
	transactionId: string
}

export async function deleteTransaction({ user, transactionId }: DeleteTransaction) {
	const docRef = doc(db, 'users', user.uid, 'transactions', transactionId)
	await deleteDoc(docRef)
}
