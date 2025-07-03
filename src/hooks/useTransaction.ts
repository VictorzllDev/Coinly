import { useContext } from 'react'
import { TransactionContext } from '@/contexts/transactionContext'

export const useTransaction = () => {
	const context = useContext(TransactionContext)
	if (!context) {
		throw new Error('useAuth deve ser usado dentro de um AuthProvider')
	}
	return context
}
