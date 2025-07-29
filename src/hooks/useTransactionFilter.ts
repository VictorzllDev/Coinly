import { useContext } from 'react'
import { TransactionFilterContext } from '@/contexts/transactionFilterContext'

export const useTransactionFilter = () => {
	const context = useContext(TransactionFilterContext)
	if (!context) {
		throw new Error('useTransactionFilter deve ser usado dentro de um TransactionFilterProvider')
	}
	return context
}
