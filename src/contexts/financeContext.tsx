import { type UseMutationResult, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { addDoc, collection, getDocs, onSnapshot } from 'firebase/firestore'
import { createContext, useEffect, useMemo } from 'react'
import { db } from '@/firebase/config'
import { useAuth } from '@/hooks/useAuth'
import type { ITransaction, ITransactionForm } from '@/types/transaction'

interface FinanceContextType {
	transactions: ITransaction[]
	isLoading: boolean
	createTransaction: UseMutationResult<ITransaction, Error, ITransactionForm, unknown>
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

	interface MutationContext {
		previousTransactions?: ITransaction[]
		tempId?: string
	}

	const createTransaction = useMutation<ITransaction, Error, ITransactionForm, MutationContext>({
		mutationFn: async ({ amount, description, category, date, type }) => {
			const transactionData = { amount, description, category, date, type }
			const ref = collection(db, 'users', user.uid, 'transactions')
			const docRef = await addDoc(ref, transactionData)

			return {
				id: docRef.id,
				...transactionData,
			} as ITransaction
		},
		onMutate: async (newTransaction) => {
			await queryClient.cancelQueries({ queryKey: ['transactions', user.uid] })
			const previousTransactions = queryClient.getQueryData<ITransaction[]>(['transactions', user.uid]) || []

			const tempId = `temp-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`

			queryClient.setQueryData<ITransaction[]>(
				['transactions', user.uid],
				[...previousTransactions, { id: tempId, ...newTransaction }],
			)

			return {
				previousTransactions,
				tempId,
			}
		},
		onError: (error, _variables, context) => {
			console.error('Erro ao criar transação:', error)

			if (context?.previousTransactions) {
				queryClient.setQueryData(['transactions', user.uid], context.previousTransactions)
			}
		},
		onSuccess: (createdTransaction, _variables, context) => {
			queryClient.setQueryData<ITransaction[]>(['transactions', user.uid], (old = []) =>
				old.map((tx) => (tx.id === context?.tempId ? createdTransaction : tx)),
			)
		},
	})

	const value = useMemo(
		() => ({
			transactions,
			isLoading,
			createTransaction,
		}),
		[transactions, isLoading, createTransaction],
	)

	return <FinanceContext.Provider value={value}>{children}</FinanceContext.Provider>
}
