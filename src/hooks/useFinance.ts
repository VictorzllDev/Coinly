import { useContext } from 'react'
import { FinanceContext } from '@/contexts/financeContext'

export const useFinance = () => {
	const context = useContext(FinanceContext)
	if (!context) {
		throw new Error('useFinance deve ser usado dentro de um FinanceProvider')
	}
	return context
}
