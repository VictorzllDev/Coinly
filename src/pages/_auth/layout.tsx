import { createFileRoute, Link, Navigate, Outlet } from '@tanstack/react-router'
import placeholder from '@/assets/brand-reveal.mp4'
import { Loading } from '@/components/shared/Loading'
import { useAuth } from '@/hooks/useAuth'

export const Route = createFileRoute('/_auth')({
	component: AuthLayout,
})

function AuthLayout() {
	const { isAuthenticated, isLoading } = useAuth()

	if (isLoading) return <Loading />

	if (isAuthenticated) return <Navigate to="/" replace />

	return (
		<div className="grid min-h-svh lg:grid-cols-2">
			<div className="flex flex-col gap-4 p-6 md:p-10">
				<div className="flex justify-center gap-2 md:justify-start">
					<Link to="/" className="flex items-center gap-2 font-medium">
						<div className="flex size-6 items-center justify-center rounded-md text-primary-foreground">
							<img src="/logo.svg" alt="Logo" className="drop-shadow-sm" />
						</div>
						Coinly
					</Link>
				</div>
				<div className="flex flex-1 items-center justify-center">
					<div className="w-full max-w-xs">
						<Outlet />
					</div>
				</div>
			</div>
			<div className="relative hidden bg-muted lg:block">
				<video
					src={placeholder}
					autoPlay
					loop
					muted
					playsInline
					className="absolute inset-0 h-full w-full object-cover object-right dark:brightness-[0.2] dark:grayscale"
				/>
			</div>
		</div>
	)
}
