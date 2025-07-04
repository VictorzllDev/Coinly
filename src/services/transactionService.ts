import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore'
import { db } from '../firebase/config'
import type { ITransaction } from '../types/transaction'

const collectionRef = collection(db, 'transactions')

export const getTransactions = async (): Promise<ITransaction[]> => {
	const querySnapshot = await getDocs(collectionRef)
	return querySnapshot.docs.map(
		(doc) =>
			({
				id: doc.id,
				...doc.data(),
			}) as ITransaction,
	)
}

export const createTransaction = async (transaction: Omit<ITransaction, 'id'>): Promise<ITransaction> => {
	const docRef = await addDoc(collectionRef, {
		description: transaction.description,
		category: transaction.category,
		amount: transaction.amount,
		date: transaction.date,
		type: transaction.type,
	})

	return {
		id: docRef.id,
		...transaction,
	} as ITransaction
}

export const updateTransaction = async (transaction: ITransaction): Promise<ITransaction> => {
	const docRef = doc(db, 'transactions', transaction.id!)
	await updateDoc(docRef, {
		description: transaction.description,
		category: transaction.category,
		amount: transaction.amount,
		date: transaction.date,
		type: transaction.type,
	})
	return transaction
}

export const deleteTransaction = async (id: string): Promise<void> => {
	const docRef = doc(db, 'transactions', id)
	await deleteDoc(docRef)
}
