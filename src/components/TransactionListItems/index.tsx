import type { ITransaction } from '@/types/transaction'
import { firestoreDateToJSDate } from '@/utils/firestoreDateToJSDate'

interface TransactionListItemsProps {
	transactions: ITransaction[]
}

const formatDate = (date: unknown) => {
	return firestoreDateToJSDate(date).toLocaleDateString('pt-BR', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	})
}

const formatAmount = (amount: number, type: 'income' | 'expense') => {
	return `${type === 'income' ? '+' : '-'}R$ ${Math.abs(amount).toFixed(2)}`
}

const getCategoryColor = (category: string) => {
	const colors = [
		'bg-blue-100 text-blue-800',
		'bg-green-100 text-green-800',
		'bg-yellow-100 text-yellow-800',
		'bg-purple-100 text-purple-800',
		'bg-pink-100 text-pink-800',
		'bg-indigo-100 text-indigo-800',
		'bg-red-100 text-red-800',
		'bg-teal-100 text-teal-800',
	]
	const index = Math.abs(category.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)) % colors.length
	return colors[index]
}

export const TransactionListItems: React.FC<TransactionListItemsProps> = ({ transactions }) => {
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
				<li
					key={transaction.id}
					className="flex flex-col justify-between gap-2 rounded-lg border border-gray-200 p-3 transition-colors hover:bg-gray-50 sm:flex-row"
				>
					<div className="flex-1">
						<div className="flex flex-wrap items-baseline gap-2">
							<strong className="text-gray-900">{transaction.description}</strong>
							<span className={`rounded-full px-2 py-1 font-medium text-xs ${getCategoryColor(transaction.category)}`}>
								{transaction.category}
							</span>
						</div>
						<div className="mt-1 text-gray-500 text-sm">{formatDate(transaction.date)}</div>
					</div>
					<div
						className={`font-bold text-lg sm:text-base ${
							transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
						}`}
					>
						{formatAmount(transaction.amount, transaction.type)}
					</div>
				</li>
			))}
		</ul>
	)
}

