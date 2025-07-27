import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { ChevronDownIcon } from 'lucide-react'
import { useState } from 'react'
import { Controller, type UseFormReturn } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { CurrencyInput } from '@/components/ui/currency-input'
import { DialogClose, DialogFooter } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useFinance } from '@/hooks/useFinance'
import { combineDateAndTime } from '@/utils/combineDateAndTime'
import type { TransactionFormInputs } from '../modals/CreateTransactionModal'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'

interface TransactionFormProps {
	setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
	form: UseFormReturn<TransactionFormInputs>
}

export function TransactionForm({ setIsModalOpen, form }: TransactionFormProps) {
	const { createTransaction } = useFinance()

	const [isCalendarOpen, setIsCalendarOpen] = useState(false)

	const {
		register,
		handleSubmit,
		control,
		formState: { errors },
		reset,
	} = form

	const onSubmit = ({ amount, description, category, date, time, type }: TransactionFormInputs) => {
		createTransaction.mutate({
			amount,
			description,
			category,
			date: combineDateAndTime({ date, time }),
			type,
		})

		setIsModalOpen(false)
		reset()
	}

	return (
		<form className="grid gap-4 py-4" onSubmit={handleSubmit(onSubmit)}>
			<div className="grid grid-cols-4 items-center gap-4">
				<Label htmlFor="amount" className="text-right">
					Valor
				</Label>
				<div className="col-span-3">
					<Controller
						name="amount"
						control={control}
						render={({ field }) => (
							<CurrencyInput
								id="amount"
								value={field.value}
								onValueChange={({ value }) => field.onChange(Number(value))}
								className="w-full"
								placeholder="R$ 0,00"
							/>
						)}
					/>
					{errors.amount && <p className="mt-1 text-red-500 text-sm">{errors.amount.message}</p>}
				</div>
			</div>

			<div className="grid grid-cols-4 items-center gap-4">
				<Label htmlFor="description" className="text-right">
					Descrição
				</Label>
				<div className="col-span-3">
					<Input id="description" className="w-full" {...register('description')} />
					{errors.description && <p className="mt-1 text-red-500 text-sm">{errors.description.message}</p>}
				</div>
			</div>

			<div className="grid grid-cols-4 items-center gap-4">
				<Label htmlFor="date" className="text-right">
					Data
				</Label>
				<div className="col-span-3">
					<Controller
						name="date"
						control={control}
						render={({ field }) => (
							<Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
								<PopoverTrigger asChild>
									<Button id="date" variant="outline" className="w-full justify-between font-normal">
										{field.value ? format(field.value, 'PPP', { locale: ptBR }) : 'Selecionar data'}
										<ChevronDownIcon />
									</Button>
								</PopoverTrigger>
								<PopoverContent className="w-auto p-0" align="start">
									<Calendar
										mode="single"
										selected={field.value}
										onSelect={(date) => {
											field.onChange(date)
											setIsCalendarOpen(false)
										}}
										captionLayout="dropdown"
										className="rounded-md border"
										locale={ptBR}
									/>
								</PopoverContent>
							</Popover>
						)}
					/>
					{errors.date && <p className="mt-1 text-red-500 text-sm">{errors.date.message}</p>}
				</div>
			</div>

			<div className="grid grid-cols-4 items-center gap-4">
				<Label htmlFor="time" className="text-right">
					Hora
				</Label>
				<div className="col-span-3">
					<Input
						type="time"
						id="time-picker"
						step="1"
						className="appearance-none bg-background [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
						{...register('time')}
					/>
					{errors.time && <p className="mt-1 text-red-500 text-sm">{errors.time.message}</p>}
				</div>
			</div>

			<div className="grid grid-cols-4 items-center gap-4">
				<Label htmlFor="category" className="text-right">
					Categoria
				</Label>
				<div className="col-span-3">
					<Controller
						name="category"
						control={control}
						render={({ field }) => (
							<Select onValueChange={field.onChange} value={field.value}>
								<SelectTrigger id="category" className="w-full">
									<SelectValue />
								</SelectTrigger>
								<SelectContent>
									<SelectGroup>
										<SelectItem value="Salário">Salário</SelectItem>
										<SelectItem value="Alimentação">Alimentação</SelectItem>
										<SelectItem value="Transporte">Transporte</SelectItem>
										<SelectItem value="Moradia">Moradia</SelectItem>
										<SelectItem value="Saúde">Saúde</SelectItem>
										<SelectItem value="Educação">Educação</SelectItem>
										<SelectItem value="Lazer">Lazer</SelectItem>
										<SelectItem value="Investimentos">Investimentos</SelectItem>
										<SelectItem value="Outro">Outro</SelectItem>
									</SelectGroup>
								</SelectContent>
							</Select>
						)}
					/>
					{errors.category && <p className="mt-1 text-red-500 text-sm">{errors.category.message}</p>}
				</div>
			</div>

			<div className="grid grid-cols-4 items-center gap-4">
				<Label htmlFor="type" className="text-right">
					Transação
				</Label>
				<div className="col-span-3">
					<Controller
						name="type"
						control={control}
						render={({ field }) => (
							<Select onValueChange={field.onChange} value={field.value}>
								<SelectTrigger id="type" className="w-full">
									<SelectValue />
								</SelectTrigger>
								<SelectContent>
									<SelectGroup>
										<SelectItem value="income">Entrada</SelectItem>
										<SelectItem value="expense">Saída</SelectItem>
									</SelectGroup>
								</SelectContent>
							</Select>
						)}
					/>
					{errors.type && <p className="mt-1 text-red-500 text-sm">{errors.type.message}</p>}
				</div>
			</div>

			<DialogFooter>
				<DialogClose asChild>
					<Button variant="outline" type="button" onClick={() => reset()}>
						Cancelar
					</Button>
				</DialogClose>
				<Button type="submit">Criar</Button>
			</DialogFooter>
		</form>
	)
}
