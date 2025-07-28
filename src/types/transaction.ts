import { z } from 'zod'

export interface ITransaction {
	id: string
	description: string
	category: string
	amount: number
	date: Date
	type: 'income' | 'expense'
}

// Definindo o schema de validação com Zod
export const transactionFormSchema = z.object({
	amount: z.number({ message: 'Digite um valor' }).min(0.01, 'Digite um valor maior que zero'),
	description: z.string().min(3, 'Minimo 3 caracteres'),
	date: z.date({
		message: 'Selecione uma data',
	}),
	time: z.string().regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?$/, 'Formato de hora inválido'),
	category: z.string({ message: 'Selecione uma categoria' }).min(3, 'Selecione uma categoria'),
	type: z.union([z.literal('income'), z.literal('expense')], {
		message: 'Selecione uma transação',
	}),
})

export type ITransactionFormInputs = z.infer<typeof transactionFormSchema>
