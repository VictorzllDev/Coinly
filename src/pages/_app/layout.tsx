import { createFileRoute, Navigate, Outlet } from '@tanstack/react-router'
import { Header } from '@/components/layout/Header'
import { Loading } from '@/components/shared/Loading'
import { useAuth } from '@/hooks/useAuth'

export const Route = createFileRoute('/_app')({
	component: AppLayout,
})

function AppLayout() {
	const { isLoading, isAuthenticated } = useAuth()

	if (isLoading) return <Loading />

	if (!isAuthenticated) return <Navigate to="/sign-in" replace />

	return (
		<>
			<Header />
			<Outlet />
		</>
	)
}
