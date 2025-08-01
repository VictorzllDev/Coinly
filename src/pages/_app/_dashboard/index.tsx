import { createFileRoute } from '@tanstack/react-router'
import { CreditCardIcon, DollarSignIcon, WalletIcon } from 'lucide-react'
import { FilterTransactionModal } from '@/components/modals/FilterTransactionModal'
import { Separator } from '@/components/ui/separator'
import { useTransactionFilter } from '@/hooks/useTransactionFilter'
import { SummaryTile } from './-components/SummaryTile'
import { TransactionsPieChart } from './-components/TransactionsPieChart'

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
			return acc - transaction.amount
		}
		return acc
	}, 0)

	const currentBalance = totalIncome + totalExpenses

	return (
		<main className="space-y-6 px-4">
			<div className="my-4 space-y-1 ">
				<h1 className="font-bold text-2xl tracking-tight sm:text-3xl">Dashboard</h1>
				<p className="text-muted-foreground text-sm md:text-base">Aqui está um resumo de sua atividade financeira.</p>
			</div>
			<div className="flex flex-row items-center justify-between gap-x-2 ">
				<div className="w-full">
					<Separator />
				</div>
				<div className="w-full max-w-[200px]">
					<FilterTransactionModal />
				</div>
			</div>

			<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
				<SummaryTile
					title="Saldo Atual"
					description="Balanço geral de receitas e despesas"
					Icon={WalletIcon}
					amount={currentBalance}
					colorByAmount
				/>
				<SummaryTile
					title="Receitas"
					description="Total de receitas no período"
					Icon={DollarSignIcon}
					amount={totalIncome}
					colorByAmount
				/>
				<SummaryTile
					title="Despesas"
					description="Total de despesas no período"
					Icon={CreditCardIcon}
					amount={totalExpenses}
					colorByAmount
				/>
			</div>

			<TransactionsPieChart transactions={filtered} />
		</main>
	)
}
