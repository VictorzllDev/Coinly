import type { UserCredential } from 'firebase/auth'
import { addDoc, collection } from 'firebase/firestore'
import { db } from '@/firebase/config'
import type { ITransaction, ITransactionFormInputs } from '@/types/transaction'

interface CreateTransaction {
	user: UserCredential['user']
	inputs: ITransactionFormInputs
}

export async function createTransaction({ user, inputs }: CreateTransaction) {
	const { amount, description, category, date, type } = inputs
	const transactionData = { amount, description, category, date, type }
	const ref = collection(db, 'users', user.uid, 'transactions')
	const docRef = await addDoc(ref, transactionData)

	return {
		id: docRef.id,
		...transactionData,
	} as ITransaction
}
