import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import { logout } from '@/services/auth/logout'
import type { IUser } from '@/types/auth'

interface UseLogout {
	setUser: React.Dispatch<React.SetStateAction<IUser | null>>
}

export function useLogout({ setUser }: UseLogout) {
	return useMutation({
		mutationFn: logout,
		onError: (error) => {
			console.log('Error ao realizar o logout:', error)
			toast.error('Erro ao realizar o logout!', {
				description: error.message,
			})
		},
		onSuccess: () => {
			setUser(null)
			toast('Até logo! Você saiu da sua conta.')
		},
	})
}
