import { createContext, useEffect, useMemo, useState } from 'react'
import { deleteTransaction, getTransactions, updateTransaction } from '@/services/transactionService'
import type { ITransaction } from '@/types/transaction'

interface TransactionContextType {
	transactions: ITransaction[]
	filteredTransactions: ITransaction[]
	setTransactions: React.Dispatch<React.SetStateAction<ITransaction[]>>
	setFilter: React.Dispatch<React.SetStateAction<string>>
	loading: boolean
	updateTransaction: (transaction: ITransaction) => Promise<void>
	deleteTransaction: (id: string) => Promise<void>
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

		return transactions.filter((transaction) => transaction.category && transaction.category.toLowerCase().includes(lowerCaseFilter))
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

	const handleUpdateTransaction = async (transaction: ITransaction) => {
		try {
			await updateTransaction(transaction)
			setTransactions((prev) => prev.map((t) => (t.id === transaction.id ? transaction : t)))
		} catch (error) {
			console.error('Error updating transaction:', error)
			throw error
		}
	}

	const handleDeleteTransaction = async (id: string) => {
		try {
			await deleteTransaction(id)
			setTransactions((prev) => prev.filter((t) => t.id !== id))
		} catch (error) {
			console.error('Error deleting transaction:', error)
			throw error
		}
	}

	return (
		<TransactionContext.Provider
			value={{
				transactions,
				filteredTransactions,
				setTransactions,
				setFilter,
				loading,
				updateTransaction: handleUpdateTransaction,
				deleteTransaction: handleDeleteTransaction,
			}}
		>
			{children}
		</TransactionContext.Provider>
	)
}
