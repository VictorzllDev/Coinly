import { LoaderIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface LoadingProps {
	className?: string
}

export function Loading({ className }: LoadingProps) {
	return (
		<div className={cn('flex min-h-dvh flex-col items-center justify-center gap-1 bg-background', className)}>
			<img src="/logo.svg" alt="Logo" className="size-18 animate-bounce drop-shadow-md" />
			<LoaderIcon className="size-10 animate-spin" />
			<div className="size-18" />
		</div>
	)
}
