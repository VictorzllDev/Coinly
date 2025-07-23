import { Button } from '@/components/ui/button'
import { Header } from '@/components/ui/header'
import { TransactionList } from '@/components/ui/transaction-list'
import type { ITransaction } from '@/types/transaction'

const transactions: ITransaction[] = [
	{
		id: '1',
		description: 'Aluguel',
		category: 'Casa',
		amount: 1000.23,
		date: new Date(),
		type: 'expense',
	},
	{
		id: '2',
		description: 'Salario',
		category: 'Salario',
		amount: 5000.4333,
		date: new Date(),
		type: 'income',
	},
	{
		id: '3',
		description: 'Aluguel',
		category: 'Casa',
		amount: 1000,
		date: new Date(),
		type: 'expense',
	},
	{
		id: '4',
		description: 'Salario',
		category: 'Salario',
		amount: 5000,
		date: new Date(),
		type: 'income',
	},
	{
		id: '5',
		description: 'Aluguel',
		category: 'Casa',
		amount: 1000,
		date: new Date(),
		type: 'expense',
	},
]

export function Home() {
	return (
		<>
			<Header />

			<main className="mt-16 p-2">
				<div className="my-4 flex flex-wrap items-center justify-between gap-x-2 ">
					<h2 className="font-bold text-gray-800 text-xl">Transações Financeiras</h2>
				</div>

				<div className="space-y-3">
					<div className="flex justify-start">
						<Button type="button" variant="default">
							nova transação
						</Button>
					</div>

					<div className="flex justify-end">
						<span className="text-gray-500 text-sm">12 Transação</span>
					</div>

					<TransactionList transactions={transactions} />
				</div>
			</main>
		</>
	)
}
