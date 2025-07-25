import { useMemo } from 'react'
import { Separator } from '@/components/ui/separator'
import { useFilter } from '@/hooks/useFilter'
import type { ITransaction } from '@/types/transaction'
import { firestoreDateToJSDate } from '@/utils/firestoreDateToJSDate'
import { TransactionItem } from './TransactionItem'

export interface ITransactionListProps {
	transactions: ITransaction[]
}

export function TransactionList({ transactions }: ITransactionListProps) {
	const { filters } = useFilter()

	const filteredTransactions = useMemo(() => {
		const { selectedCategory, minAmount, maxAmount, transactionType } = filters
		let result = [...transactions]

		if (selectedCategory) {
			result = result.filter((transaction) => transaction.category === selectedCategory)
		}

		if (transactionType !== 'all') {
			result = result.filter((transaction) => transaction.type === transactionType)
		}

		if (minAmount) {
			result = result.filter((transaction) => Math.abs(transaction.amount) >= minAmount)
		}

		if (maxAmount) {
			result = result.filter((transaction) => Math.abs(transaction.amount) <= maxAmount)
		}

		return result
	}, [transactions, filters])

	const sortedTransactions = useMemo(() => {
		return [...filteredTransactions].sort((a, b) => {
			const dateA = firestoreDateToJSDate(a.date as unknown as Date).getTime()
			const dateB = firestoreDateToJSDate(b.date as unknown as Date).getTime()
			return dateB - dateA
		})
	}, [filteredTransactions])

	if (sortedTransactions.length === 0) {
		return (
			<div className="rounded-lg border border-gray-200 p-6 text-center text-gray-500">
				Nenhuma transação encontrada
			</div>
		)
	}

	return (
		<ul className="space-y-3">
			<div className="flex items-center justify-end">
				<span className="w-full pl-4">
					<Separator />
				</span>
				<span className="text-nowrap px-4 text-gray-500 text-sm">{sortedTransactions.length} Transações</span>
			</div>

			{sortedTransactions.map((transaction) => (
				<TransactionItem key={transaction.id} transaction={transaction} />
			))}
		</ul>
	)
}
