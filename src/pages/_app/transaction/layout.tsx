import { createFileRoute, Outlet } from '@tanstack/react-router'
import { FinanceProvider } from '@/contexts/financeContext'

export const Route = createFileRoute('/_app/transaction')({
	component: HomeLayout,
})

function HomeLayout() {
	return (
		<FinanceProvider>
			<Outlet />
		</FinanceProvider>
	)
}
