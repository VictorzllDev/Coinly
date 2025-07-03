import { createContext, useEffect, useState } from 'react'
import { getTransactions } from '@/services/transactionService'
import type { ITransaction } from '@/types/transaction'

interface TransactionContextType {
	transactions: ITransaction[]
	setTransactions: React.Dispatch<React.SetStateAction<ITransaction[]>>
	loading: boolean
}

export const TransactionContext = createContext<TransactionContextType | undefined>(undefined)

export const TransactionProvider = ({ children }: { children: React.ReactNode }) => {
	const [transactions, setTransactions] = useState<ITransaction[]>([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const fetchData = async () => {
			try {
				const data = await getTransactions()
				setTransactions(data)
			} catch (error) {
				console.error('Erro ao buscar transações:', error)
			} finally {
				setLoading(false)
			}
		}

		fetchData()
	}, [])

	return (
		<TransactionContext.Provider value={{ transactions, setTransactions, loading }}>
			{children}
		</TransactionContext.Provider>
	)
}
