import { Link } from '@tanstack/react-router'
import { LogOutIcon } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { Button } from '../ui/button'

export function Header() {
	const { logout } = useAuth()

	return (
		<header className="fixed top-0 flex h-16 w-full items-center justify-between bg-white px-6 py-4 shadow-sm">
			<Link to="/" className="flex items-center gap-2 font-medium">
				<div className="flex size-6 items-center justify-center rounded-md text-primary-foreground">
					<img src="/logo.svg" alt="Logo" className="drop-shadow-sm" />
				</div>
				Coinly
			</Link>

			<Button type="button" variant="outline" onClick={() => logout.mutate()} disabled={logout.isPending}>
				<LogOutIcon />
			</Button>
		</header>
	)
}
