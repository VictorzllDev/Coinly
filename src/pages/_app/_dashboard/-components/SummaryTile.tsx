import type { LucideProps } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { formatAmount } from '@/utils/formatAmount'

interface SummaryTileProps {
	title: string
	description: string
	Icon: React.ForwardRefExoticComponent<Omit<LucideProps, 'ref'> & React.RefAttributes<SVGSVGElement>>
	amount: number
	colorByAmount?: boolean
}

export function SummaryTile({ title, description, Icon, amount, colorByAmount }: SummaryTileProps) {
	const type = amount >= 0 ? 'income' : 'expense'

	return (
		<Card>
			<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
				<CardTitle className="font-medium text-sm">{title}</CardTitle>
				<Icon className="size-4 text-muted-foreground" />
			</CardHeader>
			<CardContent>
				<div
					className={cn(
						'font-bold text-2xl text-foreground',
						colorByAmount && (amount >= 0 ? 'text-green-600' : 'text-red-600'),
					)}
				>
					{formatAmount({ amount: Math.abs(amount), type })}
				</div>
				<p className="text-muted-foreground text-xs">{description}</p>
			</CardContent>
		</Card>
	)
}
