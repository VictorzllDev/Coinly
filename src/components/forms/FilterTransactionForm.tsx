import { Button } from '@/components/ui/button'
import { getCategoryColor } from '@/components/ui/category-badge'
import { CurrencyInput } from '@/components/ui/currency-input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useTransactionFilter } from '@/hooks/useTransactionFilter'
import { DialogClose, DialogFooter } from '../ui/dialog'

export interface ITransactionFilterProps {
	categories: string[]
}

export function FilterTransactionForm({ categories }: ITransactionFilterProps) {
	const { filters, setFilters, resetFilters } = useTransactionFilter()
	const { selectedCategory, transactionType, minAmount, maxAmount } = filters

	return (
		<form className="space-y-4">
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
			<DialogFooter>
				<Button variant="destructive" type="button" onClick={resetFilters}>
					Limpar filtros
				</Button>
				<DialogClose asChild>
					<Button type="button">Fechar</Button>
				</DialogClose>
			</DialogFooter>
		</form>
	)
}
