import { useMemo, useState } from 'react'
import { useTransaction } from '@/hooks/useTransaction'
import { firestoreDateToJSDate } from '@/utils/firestoreDateToJSDate'
import { TransactionFilter } from '../TransactionFilter'
import { TransactionListItems } from '../TransactionListItems'
import { TransactionForm } from '../TransactionForm'
import type { ITransaction } from '@/types/transaction'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

export const TransactionList = () => {
	const { transactions, deleteTransaction } = useTransaction()
	const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
	const [minAmount, setMinAmount] = useState<string>('')
	const [maxAmount, setMaxAmount] = useState<string>('')
	const [transactionType, setTransactionType] = useState<'all' | 'income' | 'expense'>('all')
	const [isEditModalOpen, setIsEditModalOpen] = useState(false)
	const [selectedTransaction, setSelectedTransaction] = useState<ITransaction | null>(null)
	const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false)
	const [transactionToDeleteId, setTransactionToDeleteId] = useState<string | null>(null)

	const filteredTransactions = useMemo(() => {
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
	}, [transactions, selectedCategory, transactionType, minAmount, maxAmount])

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
		<div className="p-4">
			<div className="mb-4 flex items-center justify-between">
				<h2 className="font-bold text-gray-800 text-xl">Transações Financeiras</h2>
				<span className="text-gray-500 text-sm">
					{sortedTransactions.length} transação{sortedTransactions.length !== 1 ? 's' : ''}
				</span>
			</div>

			<TransactionFilter
				transactions={transactions}
				selectedCategory={selectedCategory}
				setSelectedCategory={setSelectedCategory}
				minAmount={minAmount}
				setMinAmount={setMinAmount}
				maxAmount={maxAmount}
				setMaxAmount={setMaxAmount}
				transactionType={transactionType}
				setTransactionType={setTransactionType}
			/>

			<TransactionListItems
				transactions={sortedTransactions}
				onEdit={handleEdit}
				onDelete={handleDeleteClick}
			/>

			{selectedTransaction && (
				<TransactionForm
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