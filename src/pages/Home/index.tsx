import { Header } from '@/components/layout/Header'
import { CreateTransactionModal } from '@/components/modals/CreateTransactionModal'
import { FilterTransactionModal } from '@/components/modals/FilterTransactionModal'
import { TransactionList } from '@/components/transactions/TransactionList'
import { FilterProvider } from '@/contexts/filterContext'
import type { ITransaction } from '@/types/transaction'

const transactions: ITransaction[] = [
	{
		id: '1',
		description: 'Aluguel',
		category: 'Casa',
		amount: 300,
		date: new Date('10-05-2024'),
		type: 'expense',
	},
	{
		id: '2',
		description: 'Salario',
		category: 'Salario',
		amount: 1000,
		date: new Date(),
		type: 'income',
	},
	{
		id: '3',
		description: 'Society',
		category: 'Lazer',
		amount: 100,
		date: new Date(),
		type: 'expense',
	},
	{
		id: '4',
		description: 'almoco',
		category: 'Restaurante',
		amount: 200.4,
		date: new Date(),
		type: 'income',
	},
	{
		id: '5',
		description: 'lancher',
		category: 'Lazer',
		amount: 40.5,
		date: new Date(),
		type: 'expense',
	},
]

export function Home() {
	return (
		<FilterProvider>
			<Header />

			<main className="mt-16 p-2">
				<div className="my-4 flex flex-wrap items-center justify-between gap-x-2 ">
					<h2 className="font-bold text-gray-800 text-xl">Transações Financeiras</h2>
				</div>

				<div className="space-y-3">
					<div className="grid grid-cols-3 items-center gap-4">
						<CreateTransactionModal />
						<FilterTransactionModal transactions={transactions} />
					</div>

					<TransactionList transactions={transactions} />
				</div>
			</main>
		</FilterProvider>
	)
}
