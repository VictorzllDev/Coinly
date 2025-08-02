import { useMutation } from '@tanstack/react-query'
import { logout } from '@/services/auth/logout'
import type { IUser} from '@/types/auth'

interface UseLogout {
	setUser: React.Dispatch<React.SetStateAction<IUser | null>>
}

export function useLogout({ setUser }: UseLogout) {
	return useMutation({
		mutationFn: logout,
		onSuccess: () => setUser(null),
	})
}
