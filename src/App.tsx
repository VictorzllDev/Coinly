import { useEffect, useState } from 'react'
import { TransactionList } from './components/TransactionList'
import { getTransactions } from './services/transactionService'
import type { ITransaction } from './types/transaction'
import { TransactionForm } from './components/TransactionForm'

export function App() {
	const [transactions, setTransactions] = useState<ITransaction[]>([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const fetchData = async () => {
			try {
				const data = await getTransactions()
				setTransactions(data)
			} catch (error) {
				console.error('Erro ao buscar transações:', error)
			} finally {
				setLoading(false)
			}
		}

		fetchData()
	}, [])

	if (loading) {
		return <div>Carregando transações...</div>
	}

	return (
		<div className="mx-auto max-w-[600px] p-5">
			<h1>Minhas Transações</h1>
			<TransactionList transactions={transactions} />
			<TransactionForm setTransactions={setTransactions} />
		</div>
	)
}
