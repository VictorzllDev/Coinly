import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { ChevronDownIcon } from 'lucide-react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { CurrencyInput } from '@/components/ui/currency-input'
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { useState } from 'react'

// Definindo o schema de validação com Zod
const transactionFormSchema = z.object({
	amount: z.number().min(0.01, 'O valor deve ser maior que zero'),
	description: z.string().min(3, 'Minimo 3 caracteres'),
	date: z.date({
		message: 'Selecione uma data',
	}),
	time: z.string().regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?$/, 'Formato de hora inválido'),
	category: z.string().min(1, 'Selecione uma categoria'),
	type: z
		.union([
			z.literal('income'),
			z.literal('expense'),
			z.literal(''), // Permite string vazia inicial
		])
		.refine((val) => val === 'income' || val === 'expense', {
			message: 'Selecione um tipo de transação',
		}),
})

type TransactionFormInputs = z.infer<typeof transactionFormSchema>

export function TransactionForm() {
	const [isCalendarOpen, setIsCalendarOpen] = useState(false)
	const [isModalOpen, setIsModalOpen] = useState(false)

	const {
		register,
		handleSubmit,
		control,
		formState: { errors },
		reset,
	} = useForm<TransactionFormInputs>({
		resolver: zodResolver(transactionFormSchema),
		defaultValues: {
			amount: 0,
			description: '',
			date: new Date(),
			time: format(new Date(), 'HH:mm'),
			category: '',
			type: '',
		},
	})

	const onSubmit = (data: TransactionFormInputs) => {
		console.log('Dados do formulário:', data)

		setIsModalOpen(false)
		reset()
	}

	return (
		<Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
			<DialogTrigger asChild>
				<Button variant="default">Nova Transação</Button>
			</DialogTrigger>

			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Criar Nova Transação</DialogTitle>
					<DialogDescription>Preencha os detalhes para adicionar uma nova transação.</DialogDescription>
				</DialogHeader>

				<form id="transaction-form" className="grid gap-4 py-4" onSubmit={handleSubmit(onSubmit)}>
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
											<SelectValue placeholder="Categoria" />
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
											<SelectValue placeholder="Transação" />
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
						<Button type="submit" form="transaction-form">
							Criar
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	)
}
