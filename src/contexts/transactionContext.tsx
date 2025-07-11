import { createContext, useEffect, useState } from 'react'
import { createTransaction, deleteTransaction, getTransactions, updateTransaction } from '@/services/transactionService'
import type { ITransaction } from '@/types/transaction'

interface IFilters {
	selectedCategory: string | null
	minAmount: string
	maxAmount: string
	transactionType: 'all' | 'income' | 'expense'
}

interface TransactionContextType {
	transactions: ITransaction[]
	setTransactions: React.Dispatch<React.SetStateAction<ITransaction[]>>
	filters: IFilters
	setFilters: React.Dispatch<React.SetStateAction<IFilters>>
	loading: boolean
	createTransaction: (transaction: ITransaction) => Promise<void>
	updateTransaction: (transaction: ITransaction) => Promise<void>
	deleteTransaction: (id: string) => Promise<void>
}

export const TransactionContext = createContext<TransactionContextType | undefined>(undefined)

export const TransactionProvider = ({ children }: { children: React.ReactNode }) => {
	const [transactions, setTransactions] = useState<ITransaction[]>([])
	const [loading, setLoading] = useState(true)
	const [filters, setFilters] = useState<IFilters>({
		selectedCategory: null,
		minAmount: '',
		maxAmount: '',
		transactionType: 'all',
	})

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

	const handlerCreateTransaction = async (transaction: ITransaction) => {
		try {
			await createTransaction(transaction)
			setTransactions((prev) => [...prev, transaction])
		} catch (error) {
			console.error('Error creating transaction:', error)
			throw error
		}
	}

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
				setTransactions,
				filters,
				setFilters,
				loading,
				createTransaction: handlerCreateTransaction,
				updateTransaction: handleUpdateTransaction,
				deleteTransaction: handleDeleteTransaction,
			}}
		>
			{children}
		</TransactionContext.Provider>
	)
}
