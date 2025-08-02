import { type QueryClient, useMutation } from '@tanstack/react-query'
import type { UserCredential } from 'firebase/auth'
import { toast } from 'sonner'
import { createTransaction } from '@/services/transaction/create'
import type { IMutationContext, ITransaction, ITransactionFormInputs } from '@/types/transaction'

interface UseCreateTransaction {
	user: UserCredential['user']
	queryClient: QueryClient
}

export function useCreateTransaction({ user, queryClient }: UseCreateTransaction) {
	return useMutation<ITransaction, Error, ITransactionFormInputs, IMutationContext>({
		mutationFn: (inputs) => createTransaction({ user, inputs }),
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

			toast.error('Erro ao criar transação!', {
				description: error.message,
			})
		},
		onSuccess: (createdTransaction, _variables, context) => {
			queryClient.setQueryData<ITransaction[]>(['transactions', user.uid], (old = []) =>
				old.map((tx) => (tx.id === context?.tempId ? createdTransaction : tx)),
			)

			toast.success('Transação criada com sucesso!')
		},
	})
}
