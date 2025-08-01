import { createFileRoute, Outlet } from '@tanstack/react-router'
import { TransactionFilterProvider } from '@/contexts/transactionFilterContext'

export const Route = createFileRoute('/_app/transaction')({
	component: TransactionLayout,
})

function TransactionLayout() {
	return (
		<TransactionFilterProvider>
			<Outlet />
		</TransactionFilterProvider>
	)
}
