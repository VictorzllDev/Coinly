import { type QueryClient, useMutation } from '@tanstack/react-query'
import type { UserCredential } from 'firebase/auth'
import { updateTransaction } from '@/services/transaction/update'
import type { IMutationContext, ITransaction } from '@/types/transaction'

interface UseUpdateTransaction {
	user: UserCredential['user']
	queryClient: QueryClient
}

export function useUpdateTransaction({ user, queryClient }: UseUpdateTransaction) {
	return useMutation<ITransaction, Error, ITransaction, IMutationContext>({
		mutationFn: (inputs) => updateTransaction({ user, inputs }),
		onMutate: async (updatedTransaction) => {
			await queryClient.cancelQueries({ queryKey: ['transactions', user.uid] })
			const previousTransactions = queryClient.getQueryData<ITransaction[]>(['transactions', user.uid]) || []

			const tempTransaction = {
				...updatedTransaction,
				id: `temp-${updatedTransaction.id}`,
			}

			queryClient.setQueryData<ITransaction[]>(
				['transactions', user.uid],
				previousTransactions.map((tx) => (tx.id === updatedTransaction.id ? tempTransaction : tx)),
			)

			return { previousTransactions, tempId: updatedTransaction.id }
		},
		onError: (error, _variables, context) => {
			console.error('Erro ao editar transação:', error)

			if (context?.previousTransactions) {
				queryClient.setQueryData(['transactions', user.uid], context.previousTransactions)
			}
		},
		onSuccess: (updatedTransaction, _variables, context) => {
			const transactionWithOriginalId = {
				...updatedTransaction,
				id: context?.tempId || updatedTransaction.id,
			}

			queryClient.setQueryData<ITransaction[]>(['transactions', user.uid], (old = []) =>
				old.map((tx) =>
					tx.id === `temp-${transactionWithOriginalId.id}` || tx.id === transactionWithOriginalId.id
						? transactionWithOriginalId
						: tx,
				),
			)
		},
	})
}
