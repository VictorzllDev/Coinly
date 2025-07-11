import { useMemo } from 'react'
import { CurrencyInput } from '@/components/ui/currency-input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useTransaction } from '@/hooks/useTransaction'
import { TransactionForm } from '../TransactionForm'

function getCategoryColor(category: string) {
	const colors = [
		'bg-blue-100 text-blue-800',
		'bg-green-100 text-green-800',
		'bg-yellow-100 text-yellow-800',
		'bg-purple-100 text-purple-800',
		'bg-pink-100 text-pink-800',
		'bg-indigo-100 text-indigo-800',
		'bg-red-100 text-red-800',
		'bg-teal-100 text-teal-800',
	]
	const index = Math.abs((category || '').split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)) % colors.length
	return colors[index]
}

export function TransactionFilter() {
	const { transactions, filters, setFilters } = useTransaction()
	const { selectedCategory, transactionType, minAmount, maxAmount } = filters

	const categories = useMemo(() => {
		const uniqueCategories = new Set<string>()
		transactions.forEach((transaction) => {
			uniqueCategories.add(transaction.category.charAt(0).toUpperCase() + transaction.category.slice(1))
		})
		return Array.from(uniqueCategories).sort()
	}, [transactions])

	return (
		<div className="mb-6 space-y-4">
			<div>
				<Label className="mb-2 block font-medium text-gray-700 text-sm">Categoria</Label>
				<div className="flex flex-wrap gap-2">
					<button
						type="button"
						onClick={() => setFilters({ ...filters, selectedCategory: null })}
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
					<Label className="mb-2 block font-medium text-gray-700 text-sm">Tipo</Label>
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
					<Label className="mb-2 block font-medium text-gray-700 text-sm">Valor Mínimo (R$)</Label>
					<CurrencyInput
						value={minAmount}
						onValueChange={(values) => setFilters({ ...filters, minAmount: values.value })}
						placeholder="0,00"
					/>
				</div>

				<div>
					<Label className="mb-2 block font-medium text-gray-700 text-sm">Valor Máximo (R$)</Label>
					<CurrencyInput
						value={maxAmount}
						onValueChange={(values) => setFilters({ ...filters, maxAmount: values.value })}
						placeholder="0,00"
					/>
				</div>
			</div>
		</div>
	)
}
