import { type QueryClient, useMutation } from '@tanstack/react-query'
import type { UserCredential } from 'firebase/auth'
import { toast } from 'sonner'
import { deleteTransaction } from '@/services/transaction/delete'
import type { IMutationContext, ITransaction } from '@/types/transaction'

interface UseDeleteTransaction {
	user: UserCredential['user']
	queryClient: QueryClient
}

export function useDeleteTransaction({ user, queryClient }: UseDeleteTransaction) {
	return useMutation<void, Error, string, IMutationContext>({
		mutationFn: (transactionId) => deleteTransaction({ user, transactionId }),
		onMutate: async (transactionId) => {
			await queryClient.cancelQueries({ queryKey: ['transactions', user.uid] })
			const previousTransactions = queryClient.getQueryData<ITransaction[]>(['transactions', user.uid]) || []

			queryClient.setQueryData<ITransaction[]>(
				['transactions', user.uid],
				previousTransactions.filter((tx) => tx.id !== transactionId),
			)

			return { previousTransactions }
		},
		onError: (error, _variables, context) => {
			console.error('Erro ao deletar transação:', error)

			if (context?.previousTransactions) {
				queryClient.setQueryData(['transactions', user.uid], context.previousTransactions)
			}

			toast.error('Erro ao deletar transação!', {
				description: error.message,
			})
		},
		onSuccess: (_data, transactionId) => {
			queryClient.setQueryData<ITransaction[]>(['transactions', user.uid], (old = []) =>
				old.filter((tx) => tx.id !== transactionId),
			)

			toast.success('Transação deletada com sucesso!')
		},
	})
}
