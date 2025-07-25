import { createFileRoute, Outlet } from '@tanstack/react-router'
import { Header } from '@/components/layout/Header'

export const Route = createFileRoute('/_app')({
	component: AppLayout,
})

function AppLayout() {
	return (
		<>
			<Header />
			<Outlet />
		</>
	)
}
