import { createFileRoute } from '@tanstack/react-router'
import { CreateTransactionModal } from '@/components/modals/CreateTransactionModal'
import { FilterTransactionModal } from '@/components/modals/FilterTransactionModal'
import { TransactionList } from '@/components/transactions/TransactionList'
import { TransactionFilterProvider } from '@/contexts/transactionFilterContext'

export const Route = createFileRoute('/_app/transaction/')({
	component: Home,
})

export function Home() {
	return (
		<TransactionFilterProvider>
			<main className="p-2">
				<div className="my-4 flex flex-wrap items-center justify-between gap-x-2 ">
					<h2 className="font-bold text-gray-800 text-xl">Transações Financeiras</h2>
				</div>

				<div className="space-y-3">
					<div className="grid grid-cols-3 items-center gap-4">
						<CreateTransactionModal />
						<FilterTransactionModal />
					</div>

					<TransactionList />
				</div>
			</main>
		</TransactionFilterProvider>
	)
}
