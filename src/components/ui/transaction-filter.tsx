import { useMemo } from 'react'
import { getCategoryColor } from '@/components/ui/category-badge'
import { CurrencyInput } from '@/components/ui/currency-input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useFilter } from '@/hooks/useFilter'
import type { ITransaction } from '@/types/transaction'
import { Button } from './button'

export interface ITransactionFilterProps {
	transactions: ITransaction[]
}

export function TransactionFilter({ transactions }: ITransactionFilterProps) {
	const { filters, setFilters, resetFilters } = useFilter()
	const { selectedCategory, transactionType, minAmount, maxAmount } = filters

	const categories = useMemo(() => {
		const uniqueCategories = new Set<string>()
		transactions.forEach((transaction) => {
			uniqueCategories.add(transaction.category)
		})
		return Array.from(uniqueCategories).sort()
	}, [transactions])

	return (
		<div className="space-y-4">
			<div>
				<Label className="mb-2 block font-medium text-gray-700 text-sm">Categorias</Label>
				<div className="flex flex-wrap gap-2">
					<button
						type="button"
						onClick={() => {
							setFilters({ ...filters, selectedCategory: null })
						}}
						className={`rounded-full px-3 py-1.5 font-medium text-sm transition-colors ${
							selectedCategory === null ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
						}`}
					>
						Todas
					</button>
					{categories.map((category) => (
						<button
							key={category}
							type="button"
							onClick={() => setFilters({ ...filters, selectedCategory: category })}
							className={`rounded-full px-3 py-1.5 font-medium text-sm transition-colors ${
								selectedCategory === category
									? 'bg-blue-500 text-white'
									: `${getCategoryColor(category)} hover:opacity-90`
							}`}
						>
							{category}
						</button>
					))}
				</div>
			</div>

			<div className="grid grid-cols-1 gap-4 md:grid-cols-3">
				<div>
					<Label className="mb-2 block font-medium text-gray-700 text-sm">Transação</Label>
					<Select
						value={transactionType}
						onValueChange={(value) =>
							setFilters({ ...filters, transactionType: value as 'all' | 'income' | 'expense' })
						}
					>
						<SelectTrigger>
							<SelectValue placeholder="Selecione o tipo" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="all">Todos</SelectItem>
							<SelectItem value="income">Entrada</SelectItem>
							<SelectItem value="expense">Saída</SelectItem>
						</SelectContent>
					</Select>
				</div>

				<div>
					<Label className="mb-2 block font-medium text-gray-700 text-sm">Valor Mínimo</Label>
					<CurrencyInput
						value={minAmount}
						onValueChange={({ value }) => setFilters({ ...filters, minAmount: Number(value) || '' })}
						placeholder="R$ 0,00"
					/>
				</div>

				<div>
					<Label className="mb-2 block font-medium text-gray-700 text-sm">Valor Máximo</Label>
					<CurrencyInput
						value={maxAmount}
						onValueChange={({ value }) => setFilters({ ...filters, maxAmount: Number(value) || '' })}
						placeholder="R$ 0,00"
					/>
				</div>
			</div>
			<Button type="button" variant="destructive" onClick={resetFilters} className="w-full">
				Limpar Filtros
			</Button>
		</div>
	)
}
