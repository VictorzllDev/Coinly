export interface ITransaction {
	id?: string
	description: string
	category: string
	amount: number
	date: Date
	type: 'income' | 'expense'
}
