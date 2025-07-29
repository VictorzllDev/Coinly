import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import { useFinance } from '@/hooks/useFinance'
import { transactionFormSchema } from '@/schemas/transaction.schema'
import type { ITransactionFormInputs } from '@/types/transaction'
import { combineDateAndTime } from '@/utils/combineDateAndTime'
import { TransactionForm } from '../forms/TransactionForm'

export function CreateTransactionModal() {
	const { createTransaction } = useFinance()

	const [isModalOpen, setIsModalOpen] = useState(false)

	const form = useForm<ITransactionFormInputs>({
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

	const onSubmit = ({ amount, description, category, date, time, type }: ITransactionFormInputs) => {
		createTransaction.mutate({
			amount,
			description,
			category,
			date: combineDateAndTime({ date, time }),
			time,
			type,
		})

		setIsModalOpen(false)
		form.reset()
	}

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

				<TransactionForm form={form} onSubmit={onSubmit} buttonLabel="Criar" />
			</DialogContent>
		</Dialog>
	)
}
