import type { z } from 'zod'
import type { transactionFormSchema } from '@/schemas/transaction.schema'

export interface ITransaction {
	id: string
	description: string
	category: string
	amount: number
	date: Date
	type: 'income' | 'expense'
}

export type ITransactionFormInputs = z.infer<typeof transactionFormSchema>

export interface IMutationContext {
	previousTransactions?: ITransaction[]
	tempId?: string
}
