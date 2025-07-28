import type { UserCredential } from 'firebase/auth'
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '@/firebase/config'
import type { ITransaction } from '@/types/transaction'

interface UpdateTransaction {
	user: UserCredential['user']
	inputs: ITransaction
}

export async function updateTransaction({ user, inputs }: UpdateTransaction) {
	const { id, ...transactionData } = inputs
	const docRef = doc(db, 'users', user.uid, 'transactions', id)
	await updateDoc(docRef, transactionData)

	return inputs as ITransaction
}
