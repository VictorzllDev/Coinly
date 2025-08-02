import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import { signInWithGoogle } from '@/services/auth/signInWithGoogle'
import type { IUser } from '@/types/auth'

interface UseGoogleSignIn {
	setUser: React.Dispatch<React.SetStateAction<IUser | null>>
}

export function useGoogleSignIn({ setUser }: UseGoogleSignIn) {
	return useMutation({
		mutationFn: signInWithGoogle,
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
