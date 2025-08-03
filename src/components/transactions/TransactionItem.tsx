import { Trash2 } from 'lucide-react'
import { CategoryBadge } from '@/components/ui/category-badge'
import type { ITransaction } from '@/types/transaction'
import { formatAmount } from '@/utils/formatAmount'
import { formatDate } from '@/utils/formatDate'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'

interface TransactionListItemsProps {
	transaction: ITransaction
	onEdit: (transaction: ITransaction) => void
	onDelete: (transaction: ITransaction) => void
}

export function TransactionItem({ transaction, onEdit, onDelete }: TransactionListItemsProps) {
	return (
		<li key={transaction.id}>
			<Card className="flex flex-row gap-0 overflow-hidden rounded-lg border border-border p-0">
				<button
					type="button"
					onClick={() => onEdit(transaction)}
					className="flex-1 cursor-pointer p-3 transition-colors hover:bg-accent active:bg-accent/50"
				>
					<CardHeader className="flex flex-wrap items-baseline gap-2 p-0">
						<CardTitle className="text-foreground">{transaction.description}</CardTitle>
						<CategoryBadge category={transaction.category} />
					</CardHeader>
					<CardContent className="p-0">
						<div className="mt-1 flex text-muted-foreground text-sm">{formatDate(transaction.date)}</div>
						<div className="mt-1 flex items-center gap-2">
							<div
								className={`font-bold text-lg sm:text-base ${
									transaction.type === 'income'
										? 'text-green-600 dark:text-green-400'
										: 'text-red-600 dark:text-red-400'
								}`}
							>
								{formatAmount({ amount: transaction.amount, type: transaction.type })}
							</div>
						</div>
					</CardContent>
				</button>
				<div>
					<button
						onClick={() => onDelete(transaction)}
						type="button"
						className="flex h-full w-14 cursor-pointer items-center justify-center bg-destructive text-zinc-100 transition-colors hover:bg-destructive/90 focus:outline-none active:bg-destructive/80"
						title="Deletar transação"
					>
						<Trash2 size={20} />
					</button>
				</div>
			</Card>
		</li>
	)
}
