import { type UseMutationResult, useQuery, useQueryClient } from '@tanstack/react-query'
import { collection, getDocs, onSnapshot } from 'firebase/firestore'
import { createContext, useEffect, useMemo } from 'react'
import { db } from '@/firebase/config'
import { useCreateTransaction, useDeleteTransaction, useUpdateTransaction } from '@/hooks/transaction'
import { useAuth } from '@/hooks/useAuth'
import type { IMutationContext, ITransaction, ITransactionFormInputs } from '@/types/transaction'

interface FinanceContextType {
	transactions: ITransaction[]
	isLoading: boolean
	createTransaction: UseMutationResult<ITransaction, Error, ITransactionFormInputs, IMutationContext>
	updateTransaction: UseMutationResult<ITransaction, Error, ITransaction, IMutationContext>
	deleteTransaction: UseMutationResult<void, Error, string, IMutationContext>
}

export const FinanceContext = createContext<FinanceContextType | undefined>(undefined)

export const FinanceProvider = ({ children }: { children: React.ReactNode }) => {
	const queryClient = useQueryClient()
	const { user } = useAuth()
	if (!user) throw new Error('User not logged in')

	const { data: transactions = [], isLoading } = useQuery<ITransaction[]>({
		queryKey: ['transactions', user.uid],
		enabled: !!user.uid,
		staleTime: Infinity,
		gcTime: 30 * 60 * 1000,
		queryFn: async () => {
			if (!user.uid) throw new Error('UID not provided')
			const transactionsRef = collection(db, 'users', user.uid, 'transactions')
			const snapshot = await getDocs(transactionsRef)

			return snapshot.docs.map((doc) => ({
				id: doc.id,
				...doc.data(),
			})) as ITransaction[]
		},
	})

	useEffect(() => {
		if (!user?.uid) return

		const transactionsRef = collection(db, 'users', user.uid, 'transactions')
		const unsubscribe = onSnapshot(transactionsRef, (snapshot) => {
			const realTimeData = snapshot.docs.map((doc) => ({
				id: doc.id,
				...doc.data(),
			})) as ITransaction[]

			queryClient.setQueryData(['transactions', user.uid], realTimeData)
		})

		return () => unsubscribe()
	}, [user?.uid, queryClient])

	const createTransaction = useCreateTransaction({ user, queryClient })
	const updateTransaction = useUpdateTransaction({ user, queryClient })
	const deleteTransaction = useDeleteTransaction({ user, queryClient })

	const value = useMemo(
		() => ({
			transactions,
			isLoading,
			createTransaction,
			updateTransaction,
			deleteTransaction,
		}),
		[transactions, isLoading, createTransaction, updateTransaction, deleteTransaction],
	)

	return <FinanceContext.Provider value={value}>{children}</FinanceContext.Provider>
}
