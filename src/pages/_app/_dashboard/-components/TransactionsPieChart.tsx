import { ChartPieIcon } from 'lucide-react'
import { useMemo } from 'react'
import { Pie, PieChart } from 'recharts'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { type ChartConfig, ChartContainer, ChartLegend, ChartLegendContent } from '@/components/ui/chart'
import type { ITransaction } from '@/types/transaction'

interface ChartData {
	category: string
	amount: number
	fill: string
}

interface Props {
	transactions: ITransaction[]
}

export function TransactionsPieChart({ transactions }: Props) {
	const chartData = useMemo((): ChartData[] => {
		const categoryBalances = transactions.reduce(
			(acc, transaction) => {
				if (!acc[transaction.category]) {
					acc[transaction.category] = 0
				}

				if (transaction.type === 'income') {
					acc[transaction.category] += Math.abs(transaction.amount)
				} else {
					acc[transaction.category] -= Math.abs(transaction.amount)
				}

				return acc
			},
			{} as Record<string, number>,
		)

		const nonZeroCategories = Object.entries(categoryBalances).filter(([_, amount]) => amount !== 0)

		return nonZeroCategories.map(([category, amount], index) => ({
			category,
			amount: Math.abs(amount),
			fill: `var(--chart-${(index % 5) + 1})`,
		}))
	}, [transactions])

	const chartConfig: ChartConfig = useMemo(() => {
		const config: ChartConfig = {
			amount: {
				label: 'Amount',
			},
		}
		chartData.forEach((item) => {
			config[item.category] = {
				label: item.category,
				color: item.fill,
			}
		})
		return config
	}, [chartData])

	if (chartData.length === 0) {
		return (
			<Card>
				<CardHeader>
					<CardTitle>Balanço Financeiro por Categoria</CardTitle>
					<CardDescription>Balanço líquido (receitas - despesas) por categoria</CardDescription>
				</CardHeader>
				<CardContent className="flex h-[330px] flex-col items-center justify-center gap-3">
					<ChartPieIcon className="size-16 text-muted-foreground" />
					<p>Não há dados para exibir neste período.</p>
				</CardContent>
			</Card>
		)
	}

	return (
		<Card>
			<CardHeader>
				<CardTitle>Balanço Financeiro por Categoria</CardTitle>
				<CardDescription>Balanço líquido (receitas - despesas) por categoria</CardDescription>
			</CardHeader>
			<CardContent className="p-4">
				<ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[330px]">
					<PieChart>
						<Pie
							data={chartData}
							dataKey="amount"
							nameKey="category"
							labelLine={false}
							label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
						/>
						<ChartLegend
							content={<ChartLegendContent nameKey="category" />}
							className="-translate-y-2 flex-wrap gap-2 *:basis-1/4 *:justify-center"
						/>
					</PieChart>
				</ChartContainer>
			</CardContent>
		</Card>
	)
}
