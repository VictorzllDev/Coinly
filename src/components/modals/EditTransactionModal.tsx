import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'
import { useForm } from 'react-hook-form'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { useFinance } from '@/hooks/useFinance'
import { type ITransaction, type ITransactionFormInputs, transactionFormSchema } from '@/types/transaction'
import { combineDateAndTime } from '@/utils/combineDateAndTime'
import { TransactionForm } from '../forms/TransactionForm'

interface EditTransactionModalProps {
	transaction: ITransaction
	isOpen: boolean
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export function EditTransactionModal({ transaction, isOpen, setIsOpen }: EditTransactionModalProps) {
	const { editTransaction } = useFinance()

	const { id, ...defaultValues } = transaction

	const form = useForm<ITransactionFormInputs>({
		resolver: zodResolver(transactionFormSchema),
		values: {
			...defaultValues,
			time: format(defaultValues.date, 'HH:mm:ss'),
		},
	})

	const handleSubmit = ({ amount, description, category, date, time, type }: ITransactionFormInputs) => {
		editTransaction.mutate({
			id,
			amount,
			description,
			category,
			date: combineDateAndTime({ date, time }),
			type,
		})

		setIsOpen(false)
		form.reset()
	}

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Editar transação</DialogTitle>
					<DialogDescription>Altere os detalhes para editar a transação.</DialogDescription>
				</DialogHeader>

				<TransactionForm form={form} onSubmit={handleSubmit} />
			</DialogContent>
		</Dialog>
	)
}
