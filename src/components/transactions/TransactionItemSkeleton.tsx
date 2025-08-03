import { Skeleton } from '@/components/ui/skeleton'

export function TransactionItemSkeleton() {
	return (
		<li className="flex flex-row justify-between overflow-hidden rounded-lg border">
			<div className="flex flex-1 flex-col gap-2 p-3">
				<div className="flex items-center justify-start gap-1">
					<Skeleton className="h-5 w-26" />
					<Skeleton className="h-5 w-20 rounded-full" />
				</div>
				<div>
					<Skeleton className="h-4 w-34" />
				</div>
				<div>
					<Skeleton className="h-5 w-24" />
				</div>
			</div>
		</li>
	)
}
