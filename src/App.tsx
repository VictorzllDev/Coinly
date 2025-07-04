import { TransactionList } from './components/TransactionList'
import { useTransaction } from './hooks/useTransaction'
import { Header } from './components/Header'
import LoadingScreen from './components/LoadingScreen'

export function App() {
	const { loading } = useTransaction()

	if (loading) {
		return <LoadingScreen />
	}

	return (
		<>
			<Header />
			<div className="mx-auto p-5">
				<TransactionList />
			</div>
		</>
	)
}
