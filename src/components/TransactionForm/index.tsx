import { CurrencyInput } from '@/components/ui/currency-input'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useTransaction } from '@/hooks/useTransaction'
import { createTransaction } from '@/services/transactionService'
import type { ITransaction } from '@/types/transaction'
import { Popover, PopoverContent, PopoverTrigger } from '@radix-ui/react-popover'
import { SelectGroup } from '@radix-ui/react-select'
import { ChevronDownIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { firestoreDateToJSDate } from '@/utils/firestoreDateToJSDate'

interface TransactionFormProps {
	open?: boolean
	onOpenChange?: (open: boolean) => void
	initialData?: ITransaction | null
}

export function TransactionForm({ open, onOpenChange, initialData }: TransactionFormProps) {
	const [amount, setAmount] = useState('')
	const [description, setDescription] = useState('')
	const [category, setCategory] = useState('')
	const [type, setType] = useState<'expense' | 'income'>('income')
	const [date, setDate] = useState<Date>(new Date())
	const [isCalendarOpen, setIsCalendarOpen] = useState(false)
	const [internalIsOpen, setInternalIsOpen] = useState(false)

	const { setTransactions, updateTransaction } = useTransaction()

	const isControlled = typeof open === 'boolean' && typeof onOpenChange === 'function'
	const currentOpen = isControlled ? open : internalIsOpen
	const currentOnOpenChange = isControlled ? onOpenChange : setInternalIsOpen

	useEffect(() => {
		if (initialData) {
			setAmount(String(initialData.amount))
			setDescription(initialData.description)
			setCategory(initialData.category)
			setType(initialData.type)
			setDate(firestoreDateToJSDate(initialData.date))
		} else {
			setAmount('')
			setDescription('')
			setCategory('')
			setType('income')
			setDate(new Date())
		}
	}, [initialData])

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()

		try {
			const parseAmount = (value: string) => Number(value.replace(/\D/g, '')) / 100

			const newAmount = parseAmount(amount)

			if (initialData) {
				await updateTransaction({
					...initialData,
					amount: newAmount,
					description,
					category,
					date,
					type,
				})
			} else {
				const createdTransaction = await createTransaction({
					amount: newAmount,
					description,
					category,
					date,
					type,
				})

				setTransactions((prevTransactions: ITransaction[]) => [createdTransaction, ...prevTransactions])
			}
		} catch (error) {
			console.error(`Error ${initialData ? 'updating' : 'adding'} transaction: `, error)
			throw error
		} finally {
			currentOnOpenChange(false)
			setAmount('')
			setDescription('')
			setCategory('')
			setDate(new Date())
			setType('income')
		}
	}

	return (
		<Dialog open={currentOpen} onOpenChange={currentOnOpenChange}>
			{!initialData && (
				<DialogTrigger asChild>
					<Button variant="default">Adicionar Tarefa</Button>
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
							onValueChange={(values) => setAmount(values.value)}
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
							onChange={(e) => setDescription(e.target.value)}
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
											? date.toLocaleDateString('pt-BR', {
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
										selected={date}
										captionLayout="dropdown"
										onSelect={(date) => {
											setDate(date)
											setIsCalendarOpen(false)
										}}
										className="rounded-md border"
									/>
								</PopoverContent>
							</Popover>
						</div>
					</div>

					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="category" className="text-right">
							Cartegoria
						</Label>
						<Input
							value={category}
							onChange={(e) => setCategory(e.target.value.replaceAll(/\s/g, ''))}
							className="col-span-3"
							required
						/>
					</div>

					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="category" className="text-right">
							Transação
						</Label>
						<Select defaultValue="income" onValueChange={(e) => setType(e as 'expense' | 'income')} value={type}>
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

					<div className="flex justify-end">
						<Button type="submit">Salvar</Button>
					</div>
				</form>
			</DialogContent>
		</Dialog>
	)
}
