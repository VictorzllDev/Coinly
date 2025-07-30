import { createFileRoute, Navigate, Outlet } from '@tanstack/react-router'
import { BottomNav } from '@/components/layout/BottomNav'
import { Header } from '@/components/layout/Header'
import { Loading } from '@/components/shared/Loading'
import { FinanceProvider } from '@/contexts/financeContext'
import { useAuth } from '@/hooks/useAuth'

export const Route = createFileRoute('/_app')({
	component: AppLayout,
})

function AppLayout() {
	const { isLoading, isAuthenticated } = useAuth()

	if (isLoading) return <Loading />

	if (!isAuthenticated) return <Navigate to="/sign-in" replace />

	return (
		<FinanceProvider>
			<Header />
			<div className="py-16">
				<Outlet />
			</div>
			<BottomNav />
		</FinanceProvider>
	)
}
