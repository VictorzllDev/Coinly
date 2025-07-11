import { Header } from './components/Header'
import LoadingScreen from './components/LoadingScreen'
import { TransactionList } from './components/TransactionList'
import { useTransaction } from './hooks/useTransaction'

export function App() {
	const { loading } = useTransaction()

	if (loading) {
		return <LoadingScreen />
	}

	return (
		<>
			<Header />
			<div className="mx-auto sm:p-5">
				<TransactionList />
			</div>
		</>
	)
}
