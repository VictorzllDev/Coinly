import type React from 'react'
import { DollarSign, CreditCard, Wallet } from 'lucide-react'

interface DashboardCardsProps {
	totalIncome: number
	totalExpenses: number
	currentBalance: number
}

export const DashboardCards: React.FC<DashboardCardsProps> = ({ totalIncome, totalExpenses, currentBalance }) => {
	return (
		<div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
			<div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
				<div className="mb-2 flex items-center justify-between">
					<h3 className="font-semibold text-lg">Receitas Totais</h3>
					<DollarSign className="h-5 w-5 text-green-600" />
				</div>
				<p className="font-bold text-2xl text-green-600">R$ {totalIncome.toFixed(2)}</p>
			</div>
			<div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
				<div className="mb-2 flex items-center justify-between">
					<h3 className="font-semibold text-lg">Despesas Totais</h3>
					<CreditCard className="h-5 w-5 text-red-600" />
				</div>
				<p className="font-bold text-2xl text-red-600">R$ {totalExpenses.toFixed(2)}</p>
			</div>
			<div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
				<div className="mb-2 flex items-center justify-between">
					<h3 className="font-semibold text-lg">Saldo Atual</h3>
					<Wallet className={`h-5 w-5 ${currentBalance >= 0 ? 'text-green-600' : 'text-red-600'}`} />
				</div>
				<p className={`font-bold text-2xl ${currentBalance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
					R$ {currentBalance.toFixed(2)}
				</p>
			</div>
		</div>
	)
}
