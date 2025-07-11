import { useMemo, useState } from 'react'
import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog'
import { useTransaction } from '@/hooks/useTransaction'
import type { ITransaction } from '@/types/transaction'
import { firestoreDateToJSDate } from '@/utils/firestoreDateToJSDate'
import { TransactionFilter } from '../TransactionFilter'
import { TransactionForm } from '../TransactionForm'
import { TransactionListItems } from '../TransactionListItems'

export const TransactionList = () => {
	const { transactions, deleteTransaction, filters, createTransaction, updateTransaction } = useTransaction()

	const [isEditModalOpen, setIsEditModalOpen] = useState(false)
	const [selectedTransaction, setSelectedTransaction] = useState<ITransaction | null>(null)
	const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false)
	const [transactionToDeleteId, setTransactionToDeleteId] = useState<string | null>(null)

	const filteredTransactions = useMemo(() => {
		const { selectedCategory, minAmount, maxAmount, transactionType } = filters
		let result = [...transactions]

		if (selectedCategory) {
			result = result.filter((transaction) => transaction.category === selectedCategory)
		}

		if (transactionType !== 'all') {
			result = result.filter((transaction) => transaction.type === transactionType)
		}

		if (minAmount) {
			const min = parseFloat(minAmount)
			result = result.filter((transaction) => Math.abs(transaction.amount) >= min)
		}

		if (maxAmount) {
			const max = parseFloat(maxAmount)
			result = result.filter((transaction) => Math.abs(transaction.amount) <= max)
		}

		return result
	}, [transactions, filters])

	const sortedTransactions = useMemo(() => {
		return [...filteredTransactions].sort((a, b) => {
			const dateA = firestoreDateToJSDate(a.date as unknown as Date).getTime()
			const dateB = firestoreDateToJSDate(b.date as unknown as Date).getTime()
			return dateB - dateA
		})
	}, [filteredTransactions])

	const handleEdit = (transaction: ITransaction) => {
		setSelectedTransaction(transaction)
		setIsEditModalOpen(true)
	}

	const handleDeleteClick = (id: string) => {
		setTransactionToDeleteId(id)
		setIsConfirmDeleteOpen(true)
	}

	const confirmDelete = async () => {
		if (transactionToDeleteId) {
			await deleteTransaction(transactionToDeleteId)
			setTransactionToDeleteId(null)
			setIsConfirmDeleteOpen(false)
		}
	}

	return (
		<div>
			<div className="mb-4 flex items-center justify-between">
				<h2 className="font-bold text-gray-800 text-xl">Transações Financeiras</h2>
				<span className="text-gray-500 text-sm">
					{sortedTransactions.length} transação{sortedTransactions.length !== 1 ? 's' : ''}
				</span>
			</div>

			<TransactionFilter />

			<div className="my-4 flex flex-1 justify-end pt-4">
				<TransactionForm onSubmit={createTransaction}>Adicionar Tarefa</TransactionForm>
			</div>

			<TransactionListItems transactions={sortedTransactions} onEdit={handleEdit} onDelete={handleDeleteClick} />

			{selectedTransaction && (
				<TransactionForm
					onSubmit={updateTransaction}
					open={isEditModalOpen}
					onOpenChange={setIsEditModalOpen}
					initialData={selectedTransaction}
				/>
			)}

			<Dialog open={isConfirmDeleteOpen} onOpenChange={setIsConfirmDeleteOpen}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Confirmar Exclusão</DialogTitle>
						<DialogDescription>
							Tem certeza que deseja deletar esta transação? Esta ação não pode ser desfeita.
						</DialogDescription>
					</DialogHeader>
					<DialogFooter>
						<Button variant="outline" onClick={() => setIsConfirmDeleteOpen(false)}>
							Cancelar
						</Button>
						<Button variant="destructive" onClick={confirmDelete}>
							Deletar
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</div>
	)
}
