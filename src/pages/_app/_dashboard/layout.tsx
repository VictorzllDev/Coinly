import { createFileRoute, Outlet } from '@tanstack/react-router'
import { TransactionFilterProvider } from '@/contexts/transactionFilterContext'

export const Route = createFileRoute('/_app/_dashboard')({
	component: DashboardLayout,
})

function DashboardLayout() {
	return (
		<TransactionFilterProvider>
			<Outlet />
		</TransactionFilterProvider>
	)
}
