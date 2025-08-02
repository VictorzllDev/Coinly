import { useMutation } from '@tanstack/react-query'
import { signInWithEmail } from '@/services/auth/signInWithEmail'
import type { IUser } from '@/types/auth'

interface UseSignIn {
	setUser: React.Dispatch<React.SetStateAction<IUser | null>>
}

export function useSignIn({ setUser }: UseSignIn) {
	return useMutation({
		mutationFn: signInWithEmail,
		onSuccess: (user) => setUser(user),
	})
}
