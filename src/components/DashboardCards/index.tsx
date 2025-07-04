import type React from 'react'
import { DollarSign, CreditCard, Wallet } from 'lucide-react'

interface DashboardCardsProps {
	totalIncome: number
	totalExpenses: number
	currentBalance: number
}

export const DashboardCards: React.FC<DashboardCardsProps> = ({ totalIncome, totalExpenses, currentBalance }) => {
	return (
		<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 mb-6">
			<div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
				<div className="flex items-center justify-between mb-2">
					<h3 className="text-lg font-semibold">Receitas Totais</h3>
					<DollarSign className="h-5 w-5 text-green-600" />
				</div>
				<p className="text-2xl font-bold text-green-600">R$ {totalIncome.toFixed(2)}</p>
			</div>
			<div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
				<div className="flex items-center justify-between mb-2">
					<h3 className="text-lg font-semibold">Despesas Totais</h3>
					<CreditCard className="h-5 w-5 text-red-600" />
				</div>
				<p className="text-2xl font-bold text-red-600">R$ {totalExpenses.toFixed(2)}</p>
			</div>
			<div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
				<div className="flex items-center justify-between mb-2">
					<h3 className="text-lg font-semibold">Saldo Atual</h3>
					<Wallet className={`h-5 w-5 ${currentBalance >= 0 ? 'text-green-600' : 'text-red-600'}`} />
				</div>
				<p className={`text-2xl font-bold ${currentBalance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
					R$ {currentBalance.toFixed(2)}
				</p>
			</div>
		</div>
	)
}
