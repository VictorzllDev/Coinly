export interface IFormatAmountProps {
	amount: number
	type?: 'income' | 'expense'
}

export function formatAmount({ amount, type }: IFormatAmountProps) {
	const formattedAmount = amount.toLocaleString('pt-BR', {
		style: 'currency',
		currency: 'BRL',
	})

	let symbol: string
	switch (type) {
		case 'income':
			symbol = '+'
			break

		case 'expense':
			symbol = '-'
			break

		default:
			symbol = ''
			break
	}

	const symbolAmount = `${symbol}${formattedAmount}`

	return symbolAmount.trim()
}
