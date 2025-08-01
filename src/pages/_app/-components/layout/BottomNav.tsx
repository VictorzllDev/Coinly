import { Link } from '@tanstack/react-router'
import { ArrowRightLeftIcon, LayoutDashboardIcon } from 'lucide-react'

export function BottomNav() {
	return (
		<div className="fixed bottom-0 h-16 w-full border-t bg-background">
			<div className="mx-auto grid h-full max-w-lg grid-cols-2">
				<Link
					to="/"
					className="inline-flex flex-col items-center justify-center px-5 hover:bg-muted active:bg-muted"
					activeProps={{
						className: 'text-primary',
					}}
				>
					<LayoutDashboardIcon className="mb-1 size-5" />
					<span className="text-sm">Dashboard</span>
				</Link>
				<Link
					to="/transaction"
					className="inline-flex flex-col items-center justify-center px-5 hover:bg-muted active:bg-muted"
					activeProps={{
						className: 'text-primary',
					}}
				>
					<ArrowRightLeftIcon className="mb-1 size-5" />
					<span className="text-sm">Transações</span>
				</Link>
			</div>
		</div>
	)
}
