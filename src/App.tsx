import { TransactionForm } from './components/TransactionForm'
import { TransactionList } from './components/TransactionList'
import { useTransaction } from './hooks/useTransaction'

export function App() {
	const { loading } = useTransaction()

	if (loading) {
		return <div>Carregando transações...</div>
	}

	return (
		<div className="mx-auto max-w-[600px] p-5">
			<h1>Minhas Transações</h1>
			<TransactionList />
			<TransactionForm />
		</div>
	)
}
