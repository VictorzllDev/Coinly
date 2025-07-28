import { Trash2 } from 'lucide-react'
import { CategoryBadge } from '@/components/ui/category-badge'
import type { ITransaction } from '@/types/transaction'
import { formatAmount } from '@/utils/formatAmount'
import { formatDate } from '@/utils/formatDate'

interface TransactionListItemsProps {
	transaction: ITransaction
	onEdit: (transaction: ITransaction) => void
}

export function TransactionItem({ transaction, onEdit }: TransactionListItemsProps) {
	return (
		<li
			key={transaction.id}
			className="flex flex-row justify-between overflow-hidden rounded-lg border border-gray-200 transition-colors"
		>
			<button
				type="button"
				onClick={() => onEdit(transaction)}
				className="flex-1 cursor-pointer p-3 hover:bg-gray-100 active:bg-gray-100"
			>
				<div className="flex flex-wrap items-baseline gap-2">
					<strong className="text-gray-900">{transaction.description}</strong>
					<CategoryBadge category={transaction.category} />
				</div>
				<div className="mt-1 flex text-gray-500 text-sm">{formatDate(transaction.date)}</div>
				<div className="flex items-center gap-2">
					<div
						className={`font-bold text-lg sm:text-base ${
							transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
						}`}
					>
						{formatAmount({ amount: transaction.amount, type: transaction.type })}
					</div>
				</div>
			</button>
			<div>
				<button
					onClick={() => {
						console.log('Deletar item nao feita')
					}}
					type="button"
					className="flex h-full w-14 cursor-pointer items-center justify-center bg-red-500 text-white hover:bg-red-600 focus:outline-none active:bg-red-600"
					title="Deletar transação"
				>
					<Trash2 size={20} />
				</button>
			</div>
		</li>
	)
}
