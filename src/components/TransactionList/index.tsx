import type { ITransaction } from '@/types/transaction'
import { firestoreDateToJSDate } from '@/utils/firestoreDateToJSDate'

interface TransactionListProps {
	transactions: ITransaction[]
}

export const TransactionList = ({ transactions }: TransactionListProps) => {
	return (
		<div className="p-4">
			<h2 className="text-xl font-bold mb-4 text-gray-800">Transações Financeiras</h2>
			<ul className="space-y-3">
				{transactions.map((transaction) => (
					<li
						key={transaction.id}
						className="p-3 border border-gray-200 rounded-lg flex flex-col sm:flex-row justify-between gap-2 hover:bg-gray-50 transition-colors"
					>
						<div className="flex-1">
							<div className="flex flex-wrap items-baseline gap-2">
								<strong className="text-gray-900">{transaction.description}</strong>
								<span className="text-xs font-medium bg-blue-100 text-blue-800 rounded-full px-2 py-1">
									{transaction.category}
								</span>
							</div>
							<div className="text-sm text-gray-500 mt-1">
								{firestoreDateToJSDate(transaction.date).toLocaleDateString()}
							</div>
						</div>
						<div
							className={`font-bold text-lg sm:text-base ${
								transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
							}`}
						>
							{transaction.type === 'income' ? '+' : '-'}
							R$ {Math.abs(transaction.amount).toFixed(2)}
						</div>
					</li>
				))}
			</ul>
		</div>
	)
}
