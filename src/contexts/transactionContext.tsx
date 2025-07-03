import { createContext, useEffect, useMemo, useState } from 'react'
import { getTransactions } from '@/services/transactionService'
import type { ITransaction } from '@/types/transaction'

interface TransactionContextType {
	transactions: ITransaction[]
	filteredTransactions: ITransaction[]
	setTransactions: React.Dispatch<React.SetStateAction<ITransaction[]>>
	setFilter: React.Dispatch<React.SetStateAction<string>>
	loading: boolean
}

export const TransactionContext = createContext<TransactionContextType | undefined>(undefined)

export const TransactionProvider = ({ children }: { children: React.ReactNode }) => {
	const [transactions, setTransactions] = useState<ITransaction[]>([])
	const [loading, setLoading] = useState(true)
	const [filter, setFilter] = useState('alimento')

	// Filter transactions based on the filter string
	const filteredTransactions = useMemo(() => {
		if (!filter) return transactions

		const lowerCaseFilter = filter.toLowerCase()

		return transactions.filter((transaction) => transaction.category.toLowerCase().includes(lowerCaseFilter))
	}, [transactions, filter])

	useEffect(() => {
		const fetchData = async () => {
			try {
				setLoading(true)
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
		<TransactionContext.Provider
			value={{
				transactions,
				filteredTransactions,
				setTransactions,
				setFilter,
				loading,
			}}
		>
			{children}
		</TransactionContext.Provider>
	)
}
