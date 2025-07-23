import { Trash2 } from 'lucide-react'
import type { ITransaction } from '@/types/transaction'
import { formatAmount } from '@/utils/formatAmount'
import { formatDate } from '@/utils/formatDate'
import { CategoryBadge } from './category-badge'

interface TransactionListItemsProps {
	transaction: ITransaction
}

export function TransactionItem({ transaction }: TransactionListItemsProps) {
	return (
		<li
			key={transaction.id}
			className="flex flex-row justify-between gap-2 overflow-hidden rounded-lg border border-gray-200 transition-colors hover:bg-gray-50"
		>
			<button
				type="button"
				onClick={() => {
					console.log('Editar item nao feita')
				}}
				className="flex-1 cursor-pointer p-3"
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
					className="flex h-full w-14 cursor-pointer items-center justify-center bg-red-500 text-white focus:outline-none"
					title="Deletar transação"
				>
					<Trash2 size={18} />
				</button>
			</div>
		</li>
	)
}
