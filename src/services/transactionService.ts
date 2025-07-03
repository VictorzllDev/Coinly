import { collection, getDocs } from 'firebase/firestore'
import { db } from '../firebase/config'
import type { ITransaction } from '../types/transaction'

export const getTransactions = async (): Promise<ITransaction[]> => {
	const querySnapshot = await getDocs(collection(db, 'task'))
	return querySnapshot.docs.map(
		(doc) =>
			({
				id: doc.id,
				...doc.data(),
			}) as ITransaction,
	)
}
