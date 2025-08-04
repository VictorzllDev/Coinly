import { Loader2Icon } from 'lucide-react'
import { useState } from 'react'
import { Separator } from '@/components/ui/separator'
import { useFinance } from '@/hooks/useFinance'
import { useTransactionFilter } from '@/hooks/useTransactionFilter'
import type { ITransaction } from '@/types/transaction'
import { DeleteTransactionModal } from '../modals/DeleteTransactionModal'
import { UpdateTransactionModal } from '../modals/UpdateTransactionModal'
import { TransactionItem } from './TransactionItem'
import { TransactionItemSkeleton } from './TransactionItemSkeleton'

export function TransactionList() {
	const { filtered } = useTransactionFilter()
	const { isLoading } = useFinance()

	const [isEditModalOpen, setIsEditModalOpen] = useState(false)
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
	const [transactionValues, setTransactionValues] = useState<ITransaction | null>(null)

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
					<span className="w-full">
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

	if (filtered.length === 0) {
		return <div className="rounded-lg border p-6 text-center text-gray-500">Nenhuma transação encontrada</div>
	}

	return (
		<ul className="space-y-3">
			<div className="flex items-center justify-end">
				<span className="w-full">
					<Separator />
				</span>
				<span className="text-nowrap px-4 text-gray-500 text-sm">{filtered.length} Transações</span>
			</div>

			{transactionValues && (
				<UpdateTransactionModal
					transaction={transactionValues}
					isOpen={isEditModalOpen}
					setIsOpen={setIsEditModalOpen}
				/>
			)}
			{transactionValues && (
				<DeleteTransactionModal
					transaction={transactionValues}
					isOpen={isDeleteModalOpen}
					setIsOpen={setIsDeleteModalOpen}
				/>
			)}

			{filtered.map((transaction) =>
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
