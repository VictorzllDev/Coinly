import { useTransaction } from '@/hooks/useTransaction'
import { firestoreDateToJSDate } from '@/utils/firestoreDateToJSDate'

export const TransactionList = () => {
	const { transactions } = useTransaction()
	return (
		<div className="p-4">
			<h2 className="mb-4 font-bold text-gray-800 text-xl">Transações Financeiras</h2>
			<ul className="space-y-3">
				{transactions.map((transaction) => (
					<li
						key={transaction.id}
						className="flex flex-col justify-between gap-2 rounded-lg border border-gray-200 p-3 transition-colors hover:bg-gray-50 sm:flex-row"
					>
						<div className="flex-1">
							<div className="flex flex-wrap items-baseline gap-2">
								<strong className="text-gray-900">{transaction.description}</strong>
								<span className="rounded-full bg-blue-100 px-2 py-1 font-medium text-blue-800 text-xs">
									{transaction.category}
								</span>
							</div>
							<div className="mt-1 text-gray-500 text-sm">
								{firestoreDateToJSDate(transaction.date).toLocaleDateString('pt-BR', {
									year: 'numeric',
									month: 'long',
									day: 'numeric',
								})}
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
