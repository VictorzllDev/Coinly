import type { ITransaction } from '@/types/transaction'

interface TransactionListProps {
	transactions: ITransaction[]
}

export const TransactionList = ({ transactions }: TransactionListProps) => {
	return (
		<div>
			<h2>Transações Financeiras</h2>
			<ul style={{ listStyle: 'none', padding: 0 }}>
				{transactions.map((transaction) => (
					<li
						key={transaction.id}
						style={{
							margin: '10px 0',
							padding: '10px',
							border: '1px solid #ddd',
							display: 'flex',
							justifyContent: 'space-between',
						}}
					>
						<div>
							<strong>{transaction.description}</strong>
							<div style={{ color: '#666' }}>{new Date(transaction.date).toLocaleDateString()}</div>
						</div>
						<div
							style={{
								color: transaction.type === 'income' ? 'green' : 'red',
								fontWeight: 'bold',
							}}
						>
							{transaction.type === 'income' ? '+' : '-'}
							R$ {Math.abs(transaction.amount).toFixed(2)}
						</div>
					</li>
				))}
			</ul>
		</div>
	)
}
