import type { ITransaction } from '@/types/transaction'

export interface IFormatAmountProps {
	amount: number
	type: ITransaction['type']
}

export function formatAmount({ amount, type }: IFormatAmountProps) {
	return `${type === 'income' ? '+' : '-'}R$ ${Math.abs(amount).toFixed(2)}`
}
