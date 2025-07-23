import type { ITransaction } from '@/types/transaction'
import { TransactionItem } from './transaction-item'

export interface ITransactionListProps {
	transactions: ITransaction[]
}

export function TransactionList({ transactions }: ITransactionListProps) {
	if (transactions.length === 0) {
		return (
			<div className="rounded-lg border border-gray-200 p-6 text-center text-gray-500">
				Nenhuma transação encontrada com os filtros aplicados
			</div>
		)
	}

	return (
		<ul className="space-y-3">
			{transactions.map((transaction) => (
				<TransactionItem key={transaction.id} transaction={transaction} onEdit={() => {}} onDelete={() => {}} />
			))}
		</ul>
	)
}
