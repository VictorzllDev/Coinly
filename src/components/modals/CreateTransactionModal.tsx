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
	amount: z.number({ message: 'Digite um valor' }).min(0.01, 'Digite um valor maior que zero'),
	description: z.string().min(3, 'Minimo 3 caracteres'),
	date: z.date({
		message: 'Selecione uma data',
	}),
	time: z.string().regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?$/, 'Formato de hora inválido'),
	category: z.string({ message: 'Selecione uma categoria' }).min(3, 'Selecione uma categoria'),
	type: z.union([z.literal('income'), z.literal('expense')], {
		message: 'Selecione uma transação',
	}),
})

export type TransactionFormInputs = z.infer<typeof transactionFormSchema>

export function CreateTransactionModal() {
	const [isModalOpen, setIsModalOpen] = useState(false)

	const form = useForm<TransactionFormInputs>({
		resolver: zodResolver(transactionFormSchema),
		defaultValues: {
			amount: 0,
			description: '',
			date: new Date(),
			time: format(new Date(), 'HH:mm'),
			category: '',
			type: 'income',
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
