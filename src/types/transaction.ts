export interface ITransaction {
	id?: string
	description: string
	category: string
	amount: number
	date: string
	type: 'income' | 'expense'
}
