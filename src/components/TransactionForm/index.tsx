import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { createTransaction } from '@/services/transactionService'
import type { ITransaction } from '@/types/transaction'
import { Popover, PopoverContent, PopoverTrigger } from '@radix-ui/react-popover'
import { SelectGroup } from '@radix-ui/react-select'
import { ChevronDownIcon } from 'lucide-react'
import { useState } from 'react'

export interface ITransactionProps {
	setTransactions: React.Dispatch<React.SetStateAction<ITransaction[]>>
}

export function TransactionForm({ setTransactions }: ITransactionProps) {
	const [amount, setAmount] = useState('')
	const [description, setDescription] = useState('')
	const [category, setCategory] = useState('')
	const [type, setType] = useState<'expense' | 'income'>('income')
	const [date, setDate] = useState<Date>(new Date())
	const [isOpen, setIsOpen] = useState(false)
	const [open, setOpen] = useState(false)

	const formatMoney = (input: string) => {
		let digits = input.replace(/\D/g, '')
		digits = digits.padStart(3, '0')

		const formatted = new Intl.NumberFormat('pt-BR', {
			style: 'currency',
			currency: 'BRL',
		}).format(parseFloat(digits) / 100)

		return formatted
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()

		try {
			const newAmount = Number(amount.replace(/\D/g, '')) / 100
			await createTransaction({
				amount: newAmount,
				description,
				category,
				date,
				type,
			})

			setTransactions((prevTransactions: ITransaction[]) => [
				{
					amount: newAmount,
					description,
					category,
					date,
					type,
				},
				...prevTransactions,
			])
		} catch (error) {
			console.error('Error adding transaction: ', error)
			throw error
		} finally {
			setIsOpen(false)
			setAmount('')
			setDescription('')
			setCategory('')
			setDate(new Date())
			setType('income')
		}
	}

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger asChild>
				<Button variant="default">Adicionar Tarefa</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Criar Nova Tarefa</DialogTitle>
				</DialogHeader>
				<form onSubmit={handleSubmit} className="grid gap-4 py-4">
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="amount" className="text-right">
							Valor
						</Label>
						<Input
							value={amount}
							onChange={(e) => setAmount(formatMoney(e.target.value))}
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
							<Popover open={open} onOpenChange={setOpen}>
								<PopoverTrigger asChild>
									<Button variant="outline" className="w-48 justify-between font-normal">
										{date ? date.toLocaleDateString() : 'Select date'}
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
											setOpen(false)
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
