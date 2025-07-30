import { useMemo, useState } from 'react'
import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import { useFinance } from '@/hooks/useFinance'
import { useTransactionFilter } from '@/hooks/useTransactionFilter'
import { FilterTransactionForm } from '../forms/FilterTransactionForm'

export function FilterTransactionModal() {
	const { transactions } = useFinance()
	const { filters, filtered } = useTransactionFilter()

	const [isModalOpen, setIsModalOpen] = useState(false)

	const categories = useMemo(() => {
		const uniqueCategories = new Set<string>()
		transactions.forEach((transaction) => {
			uniqueCategories.add(transaction.category)
		})
		return Array.from(uniqueCategories).sort()
	}, [transactions])

	const isFilterActive =
		filters.selectedCategory || filters.minAmount || filters.maxAmount || filters.transactionType !== 'all'

	return (
		<Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
			<DialogTrigger asChild>
				<Button variant="outline" className="w-full">
					{isFilterActive ? `Filtros (${filtered.length})` : 'Filtros'}
				</Button>
			</DialogTrigger>

			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Filtros</DialogTitle>
					<DialogDescription>Preencha os detalhes para filtrar as transações.</DialogDescription>
				</DialogHeader>

				<FilterTransactionForm categories={categories} />
			</DialogContent>
		</Dialog>
	)
}
