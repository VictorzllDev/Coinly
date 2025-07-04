import { TransactionForm } from './components/TransactionForm'
import { TransactionList } from './components/TransactionList'
import { useTransaction } from './hooks/useTransaction'
import { Header } from './components/Header'

export function App() {
	const { loading } = useTransaction()

	if (loading) {
		return <div>Carregando transações...</div>
	}

	return (
		<>
			<Header />
			<div className="mx-auto p-5">
				<TransactionList />
				<TransactionForm />
			</div>
		</>
	)
}
