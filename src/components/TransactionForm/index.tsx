import { ChevronDownIcon } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import { CategorySelect } from '@/components/CategorySelect'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { CurrencyInput } from '@/components/ui/currency-input'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import type { ITransaction } from '@/types/transaction'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'

interface TransactionFormProps {
	open?: boolean
	onOpenChange?: (open: boolean) => void
	initialData?: ITransaction | null
	onSubmit: (data: ITransaction) => Promise<void>
	children?: string
}

export function TransactionForm({ open, onOpenChange, initialData, onSubmit, children }: TransactionFormProps) {
	const [isCalendarOpen, setIsCalendarOpen] = useState(false)
	const [internalIsOpen, setInternalIsOpen] = useState(false)

	const [inputs, setInputs] = useState<ITransaction>({
		amount: 0,
		description: '',
		category: '',
		type: 'income',
		date: new Date(),
	})

	const { amount, description, category, type, date } = inputs

	const isControlled = typeof open === 'boolean' && typeof onOpenChange === 'function'
	const currentOpen = isControlled ? open : internalIsOpen
	const currentOnOpenChange = isControlled ? onOpenChange : setInternalIsOpen

	const clearForm = useCallback(() => {
		setInputs({
			amount: 0,
			description: '',
			category: '',
			type: 'income',
			date: new Date(),
		})
	}, [])

	useEffect(() => {
		if (initialData) {
			setInputs(initialData)
		} else {
			clearForm()
		}
	}, [initialData, clearForm])

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()

		try {
			await onSubmit(inputs)
		} catch (error) {
			console.error(`Error ${inputs} transaction: `, error)
			throw error
		} finally {
			currentOnOpenChange(false)
			clearForm()
		}
	}

	const handleInputChange = <T extends keyof ITransaction>(field: T, value: ITransaction[T]) => {
		setInputs((prev) => ({ ...prev, [field]: value }))
	}

	return (
		<Dialog open={currentOpen} onOpenChange={currentOnOpenChange}>
			{!initialData && (
				<DialogTrigger asChild>
					<Button variant="default">{children}</Button>
				</DialogTrigger>
			)}
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>{initialData ? 'Editar Tarefa' : 'Criar Nova Tarefa'}</DialogTitle>
					<DialogDescription>
						{initialData
							? 'Edite os detalhes da transação aqui.'
							: 'Preencha os detalhes para adicionar uma nova transação.'}
					</DialogDescription>
				</DialogHeader>
				<form onSubmit={handleSubmit} className="grid gap-4 py-4">
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="amount" className="text-right">
							Valor
						</Label>
						<CurrencyInput
							value={amount}
							onValueChange={(values) => handleInputChange('amount', Number(values.value) ?? 0)}
							className="col-span-3"
							required
						/>
					</div>

					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="description" className="text-right">
							Descrição
						</Label>
						<Input
							value={description}
							onChange={(e) => handleInputChange('description', e.target.value)}
							className="col-span-3"
							required
						/>
					</div>

					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="date" className="text-right">
							Data
						</Label>
						<div className="col-span-3">
							<Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
								<PopoverTrigger asChild>
									<Button variant="outline" className="w-48 justify-between font-normal">
										{date
											? new Date(date).toLocaleDateString('pt-BR', {
													day: '2-digit',
													month: 'long',
													year: 'numeric',
												})
											: 'Select date'}
										<ChevronDownIcon />
									</Button>
								</PopoverTrigger>
								<PopoverContent className="w-auto overflow-hidden p-0" align="start">
									<Calendar
										mode="single"
										selected={new Date(date)}
										captionLayout="dropdown"
										onSelect={(selectedDate) => {
											if (selectedDate) {
												handleInputChange('date', selectedDate)
												setIsCalendarOpen(false)
											}
										}}
										className="rounded-md border"
									/>
								</PopoverContent>
							</Popover>
						</div>
					</div>

					<CategorySelect value={category} onChange={(value) => handleInputChange('category', value)} />

					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="category" className="text-right">
							Transação
						</Label>
						<div className="col-span-3">
							<Select onValueChange={(value) => handleInputChange('type', value as 'expense' | 'income')} value={type}>
								<SelectTrigger className="w-[180px]">
									<SelectValue placeholder="Transação" />
								</SelectTrigger>
								<SelectContent>
									<SelectGroup>
										<SelectItem value="income">Entrada</SelectItem>
										<SelectItem value="expense">Saída</SelectItem>
									</SelectGroup>
								</SelectContent>
							</Select>
						</div>
					</div>

					<div className="flex justify-end">
						<Button type="submit">Salvar</Button>
					</div>
				</form>
			</DialogContent>
		</Dialog>
	)
}

