import { useMutation } from '@tanstack/react-query'
import { signInWithGoogle } from '@/services/auth/signInWithGoogle'
import type { IUser } from '@/types/auth'

interface UseGoogleSignIn {
	setUser: React.Dispatch<React.SetStateAction<IUser | null>>
}

export function useGoogleSignIn({ setUser }: UseGoogleSignIn) {
	return useMutation({
		mutationFn: signInWithGoogle,
		onSuccess: (user) => setUser(user),
	})
}
