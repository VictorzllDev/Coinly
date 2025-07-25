import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import { TransactionForm } from '../forms/TransactionForm'

// Definindo o schema de validação com Zod
const transactionFormSchema = z.object({
	amount: z.union([z.number().min(0.01, 'Valor deve ser maior que 0'), z.string().min(1, 'Digite um valor')]),
	description: z.string().min(3, 'Minimo 3 caracteres'),
	date: z.date({
		message: 'Selecione uma data',
	}),
	time: z.string().regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?$/, 'Formato de hora inválido'),
	category: z.string().min(1, 'Selecione uma categoria'),
	type: z
		.union([z.literal('income'), z.literal('expense'), z.literal('')])
		.refine((val) => val === 'income' || val === 'expense', {
			message: 'Selecione um tipo de transação',
		}),
})

export type TransactionFormInputs = z.infer<typeof transactionFormSchema>

export function CreateTransactionModal() {
	const [isModalOpen, setIsModalOpen] = useState(false)

	const form = useForm<TransactionFormInputs>({
		resolver: zodResolver(transactionFormSchema),
		defaultValues: {
			amount: '',
			description: '',
			date: new Date(),
			time: format(new Date(), 'HH:mm'),
			category: '',
			type: '',
		},
	})

	return (
		<Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
			<DialogTrigger asChild>
				<Button variant="default" className="col-span-2 w-full">
					Nova Transação
				</Button>
			</DialogTrigger>

			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Criar Nova Transação</DialogTitle>
					<DialogDescription>Preencha os detalhes para adicionar uma nova transação.</DialogDescription>
				</DialogHeader>

				<TransactionForm setIsModalOpen={setIsModalOpen} form={form} />
			</DialogContent>
		</Dialog>
	)
}
