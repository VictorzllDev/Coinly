import { createContext, useMemo, useState } from 'react'
import { useFinance } from '@/hooks/useFinance'
import type { ITransaction } from '@/types/transaction'
import { filteredTransactions } from '@/utils/filteredTransactions.utils'

export interface ITransactionFilters {
	selectedCategory: string | null
	minAmount: number | ''
	maxAmount: number | ''
	transactionType: 'all' | 'income' | 'expense'
}

const filterDefaults: ITransactionFilters = {
	selectedCategory: null,
	minAmount: '',
	maxAmount: '',
	transactionType: 'all',
}

interface TransactionFilterContextType {
	filtered: ITransaction[]
	filters: ITransactionFilters
	setFilters: React.Dispatch<React.SetStateAction<ITransactionFilters>>
	resetFilters: () => void
}

export const TransactionFilterContext = createContext<TransactionFilterContextType | undefined>(undefined)

export const TransactionFilterProvider = ({ children }: { children: React.ReactNode }) => {
	const { transactions } = useFinance()

	const [filters, setFilters] = useState<ITransactionFilters>(filterDefaults)

	const resetFilters = () => {
		setFilters(filterDefaults)
	}

	const filtered = useMemo(() => filteredTransactions({ transactions, filters }), [transactions, filters])

	return (
		<TransactionFilterContext.Provider
			value={{
				filtered,
				filters,
				setFilters,
				resetFilters,
			}}
		>
			{children}
		</TransactionFilterContext.Provider>
	)
}
