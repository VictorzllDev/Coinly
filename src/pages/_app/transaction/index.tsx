import { createFileRoute } from '@tanstack/react-router'
import { CreateTransactionModal } from '@/components/modals/CreateTransactionModal'
import { FilterTransactionModal } from '@/components/modals/FilterTransactionModal'
import { TransactionList } from '@/components/transactions/TransactionList'

export const Route = createFileRoute('/_app/transaction/')({
	component: Home,
})

export function Home() {
	return (
		<main className="space-y-6 px-4">
			<div className="my-4 space-y-1 ">
				<h1 className="font-bold text-2xl tracking-tight sm:text-3xl">Transações</h1>
				<p className="text-muted-foreground text-sm md:text-base">Aqui você gerencia suas finanças</p>
			</div>
			<div className="flex flex-row items-center justify-start gap-x-2">
				<div className="w-full max-w-[320px]">
					<CreateTransactionModal />
				</div>

				<div className="w-full max-w-[200px]">
					<FilterTransactionModal />
				</div>
			</div>

			<div>
				<div className="grid grid-cols-3 items-center gap-4"></div>

				<TransactionList />
			</div>
		</main>
	)
}
