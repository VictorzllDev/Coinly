import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import { signInWithEmail } from '@/services/auth/signInWithEmail'
import type { IUser } from '@/types/auth'

interface UseSignIn {
	setUser: React.Dispatch<React.SetStateAction<IUser | null>>
}

export function useSignIn({ setUser }: UseSignIn) {
	return useMutation({
		mutationFn: signInWithEmail,
		onError: (error) => {
			console.log('Erro ao realizar o login:', error)
			toast.error('Erro ao realizar o login!', {
				description: error.message,
			})
		},
		onSuccess: (user) => {
			setUser(user)
			toast('Login realizado com sucesso!')
		},
	})
}
