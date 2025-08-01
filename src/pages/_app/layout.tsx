import { createFileRoute, Navigate, Outlet } from '@tanstack/react-router'
import { Loading } from '@/components/shared/Loading'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { FinanceProvider } from '@/contexts/financeContext'
import { useAuth } from '@/hooks/auth/useAuth'
import { useIsMobile } from '@/hooks/useMobile'
import { BottomNav } from './-components/layout/BottomNav'
import { Header } from './-components/layout/Header'
import { AppSidebar } from './-components/layout/Sidebar/'

export const Route = createFileRoute('/_app')({
	component: AppLayout,
})

function AppLayout() {
	const { isLoading, isAuthenticated } = useAuth()
	const isMobile = useIsMobile()

	if (isLoading) return <Loading />

	if (!isAuthenticated) return <Navigate to="/sign-in" replace />

	return (
		<FinanceProvider>
			<SidebarProvider
				style={
					{
						'--sidebar-width': 'calc(var(--spacing) * 72)',
						'--header-height': 'calc(var(--spacing) * 12)',
					} as React.CSSProperties
				}
			>
				<AppSidebar variant="inset" />
				<SidebarInset>
					<Header />
					<div className="flex flex-1 flex-col">
						<div className="@container/main flex flex-1 flex-col gap-2">
							<div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
								<Outlet />
							</div>
						</div>
					</div>
					{isMobile && <BottomNav />}
				</SidebarInset>
			</SidebarProvider>
		</FinanceProvider>
	)
}
