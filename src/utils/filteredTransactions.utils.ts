import type { ITransactionFilters } from '@/contexts/transactionFilterContext'
import type { ITransaction } from '@/types/transaction'
import { firestoreDateToJSDate } from '@/utils/firestoreDateToJSDate'

interface filteredTransactions {
	transactions: ITransaction[]
	filters: ITransactionFilters
}

export function filteredTransactions({ transactions, filters }: filteredTransactions): ITransaction[] {
	const { selectedCategory, minAmount, maxAmount, transactionType } = filters
	let filteredTransactions = [...transactions]

	if (selectedCategory) {
		filteredTransactions = filteredTransactions.filter((transaction) => transaction.category === selectedCategory)
	}

	if (transactionType !== 'all') {
		filteredTransactions = filteredTransactions.filter((transaction) => transaction.type === transactionType)
	}

	if (minAmount) {
		filteredTransactions = filteredTransactions.filter((transaction) => Math.abs(transaction.amount) >= minAmount)
	}

	if (maxAmount) {
		filteredTransactions = filteredTransactions.filter((transaction) => Math.abs(transaction.amount) <= maxAmount)
	}

	const sortedTransactions = filteredTransactions
		.map((transaction) => ({
			...transaction,
			date: firestoreDateToJSDate(transaction.date as unknown as Date),
		}))
		.sort((a, b) => {
			const isATemp = a.id.startsWith('temp')
			const isBTemp = b.id.startsWith('temp')

			if (isATemp && !isBTemp) return -1
			if (!isATemp && isBTemp) return 1

			return b.date.getTime() - a.date.getTime()
		})

	return sortedTransactions
}
