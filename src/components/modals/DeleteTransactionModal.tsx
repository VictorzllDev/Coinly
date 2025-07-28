import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { useFinance } from '@/hooks/useFinance'
import type { ITransaction } from '@/types/transaction'

interface EditTransactionModalProps {
	transaction: ITransaction
	isOpen: boolean
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export function DeleteTransactionModal({ transaction, isOpen, setIsOpen }: EditTransactionModalProps) {
	const { deleteTransaction } = useFinance()

	const handleDelete = () => {
		deleteTransaction.mutate(transaction.id)

		setIsOpen(false)
	}

	return (
		<AlertDialog open={isOpen} onOpenChange={setIsOpen}>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Tem certeza?</AlertDialogTitle>
					<AlertDialogDescription>Esta ação irá apagar permanentemente essa transação.</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancelar</AlertDialogCancel>
					<AlertDialogAction onClick={handleDelete}>Apagar</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}
