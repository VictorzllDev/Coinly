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
import type { ITransaction } from '@/types/transaction'
import { FilterTransactionForm } from '../forms/FilterTransactionForm'

export interface IFilterTransactionModalProps {
	transactions: ITransaction[]
}

export function FilterTransactionModal({ transactions }: IFilterTransactionModalProps) {
	const [isModalOpen, setIsModalOpen] = useState(false)

	const categories = useMemo(() => {
		const uniqueCategories = new Set<string>()
		transactions.forEach((transaction) => {
			uniqueCategories.add(transaction.category)
		})
		return Array.from(uniqueCategories).sort()
	}, [transactions])

	return (
		<Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
			<DialogTrigger asChild>
				<Button variant="outline" className="w-full">
					Filtros
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
