import { createFileRoute } from '@tanstack/react-router'
import { CreditCardIcon, DollarSignIcon, WalletIcon } from 'lucide-react'
import { FilterTransactionModal } from '@/components/modals/FilterTransactionModal'
import { useTransactionFilter } from '@/hooks/useTransactionFilter'
import { formatAmount } from '@/utils/formatAmount'

export const Route = createFileRoute('/_app/_dashboard/')({
	component: Dashboard,
})

function Dashboard() {
	const { filtered } = useTransactionFilter()

	const totalIncome = filtered.reduce((acc, transaction) => {
		if (transaction.type === 'income') {
			return acc + transaction.amount
		}
		return acc
	}, 0)

	const totalExpenses = filtered.reduce((acc, transaction) => {
		if (transaction.type === 'expense') {
			return acc + transaction.amount
		}
		return acc
	}, 0)

	const currentBalance = totalIncome - totalExpenses

	return (
		<div className="space-y-3 p-2">
			<FilterTransactionModal />
			<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
				<div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
					<div className="mb-2 flex items-center justify-between">
						<h3 className="font-semibold text-lg">Saldo Atual</h3>
						<WalletIcon className={`h-5 w-5 ${currentBalance >= 0 ? 'text-green-600' : 'text-red-600'}`} />
					</div>
					<p className={`font-bold text-2xl ${currentBalance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
						{formatAmount({ amount: currentBalance })}
					</p>
				</div>
				<div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
					<div className="mb-2 flex items-center justify-between">
						<h3 className="font-semibold text-lg">Receitas Totais</h3>
						<DollarSignIcon className="h-5 w-5 text-green-600" />
					</div>
					<p className="font-bold text-2xl text-green-600">{formatAmount({ amount: totalIncome })}</p>
				</div>
				<div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
					<div className="mb-2 flex items-center justify-between">
						<h3 className="font-semibold text-lg">Despesas Totais</h3>
						<CreditCardIcon className="h-5 w-5 text-red-600" />
					</div>
					<p className="font-bold text-2xl text-red-600">{formatAmount({ amount: totalExpenses })}</p>
				</div>
			</div>
		</div>
	)
}
