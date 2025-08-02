import { useMutation } from '@tanstack/react-query'
import { signUpWithEmail } from '@/services/auth/signUpWithEmail'
import type { IUser } from '@/types/auth'

interface UseSignUp {
	setUser: React.Dispatch<React.SetStateAction<IUser | null>>
}

export function useSignUp({ setUser }: UseSignUp) {
	return useMutation({
		mutationFn: signUpWithEmail,
		onSuccess: (user) => setUser(user),
	})
}
