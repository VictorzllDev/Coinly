import { Loader2Icon } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Separator } from '@/components/ui/separator'
import { useFilter } from '@/hooks/useFilter'
import { useFinance } from '@/hooks/useFinance'
import type { ITransaction } from '@/types/transaction'
import { firestoreDateToJSDate } from '@/utils/firestoreDateToJSDate'
import { DeleteTransactionModal } from '../modals/DeleteTransactionModal'
import { EditTransactionModal } from '../modals/EditTransactionModal'
import { TransactionItem } from './TransactionItem'
import { TransactionItemSkeleton } from './TransactionItemSkeleton'

export function TransactionList() {
	const { filters } = useFilter()
	const { transactions, isLoading } = useFinance()

	const [isEditModalOpen, setIsEditModalOpen] = useState(false)
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
	const [transactionValues, setTransactionValues] = useState<ITransaction | null>(null)

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
		return [...filteredTransactions]
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
	}, [filteredTransactions])

	const handleEditTransaction = ({ id, amount, description, date, category, type }: ITransaction) => {
		setTransactionValues({ id, amount, description, date, category, type })
		setIsEditModalOpen(true)
	}

	const handleDeleteTransaction = ({ id, amount, description, date, category, type }: ITransaction) => {
		setTransactionValues({ id, amount, description, date, category, type })
		setIsDeleteModalOpen(true)
	}

	if (isLoading) {
		return (
			<ul className="space-y-3">
				<div className="flex items-center justify-end">
					<span className="w-full pl-4">
						<Separator />
					</span>
					<span className="flex items-center gap-1 text-nowrap px-4 text-gray-500 text-sm">
						<Loader2Icon className="size-4 animate-spin" /> Transações
					</span>
				</div>

				{[...Array(5)].map((_, index) => (
					<TransactionItemSkeleton key={`${index}-${Math.random().toString(36).substring(2, 9)}`} />
				))}
			</ul>
		)
	}

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

			{transactionValues && (
				<EditTransactionModal transaction={transactionValues} isOpen={isEditModalOpen} setIsOpen={setIsEditModalOpen} />
			)}
			{transactionValues && (
				<DeleteTransactionModal
					transaction={transactionValues}
					isOpen={isDeleteModalOpen}
					setIsOpen={setIsDeleteModalOpen}
				/>
			)}

			{sortedTransactions.map((transaction) =>
				transaction.id.startsWith('temp') ? (
					<TransactionItemSkeleton key={transaction.id} />
				) : (
					<TransactionItem
						key={transaction.id}
						transaction={transaction}
						onEdit={handleEditTransaction}
						onDelete={handleDeleteTransaction}
					/>
				),
			)}
		</ul>
	)
}
