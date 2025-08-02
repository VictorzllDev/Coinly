import type { UseMutationResult } from '@tanstack/react-query'
import { onAuthStateChanged } from 'firebase/auth'
import { createContext, useEffect, useMemo, useState } from 'react'
import { auth } from '@/firebase/config'
import { useGoogleSignIn } from '@/hooks/auth/useGoogleSignIn'
import { useLogout } from '@/hooks/auth/useLogout'
import { useSignIn } from '@/hooks/auth/useSignIn'
import { useSignUp } from '@/hooks/auth/useSignUp'
import type { ISignInWithEmail } from '@/services/auth/signInWithEmail'
import type { ISignUpWithEmail } from '@/services/auth/signUpWithEmail'
import { getUserDoc } from '@/services/userDoc/get'
import type { IUser } from '@/types/auth'

interface AuthContextType {
	user: IUser | null
	isAuthenticated: boolean
	isLoading: boolean
	googleSignIn: UseMutationResult<IUser, Error, void, unknown>
	signIn: UseMutationResult<IUser, Error, ISignInWithEmail, unknown>
	signUp: UseMutationResult<IUser, Error, ISignUpWithEmail, unknown>
	logout: UseMutationResult<void, Error, void, unknown>
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [user, setUser] = useState<IUser | null>(null)
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, async (user) => {
			if (user) {
				const userDoc = await getUserDoc(user.uid)
				setUser({ ...user, ...userDoc })
			} else {
				setUser(user)
			}

			setIsLoading(false)
		})
		return () => unsubscribe()
	}, [])

	const googleSignIn = useGoogleSignIn({ setUser })
	const signIn = useSignIn({ setUser })
	const signUp = useSignUp({ setUser })
	const logout = useLogout({ setUser })

	const value = useMemo(
		() => ({
			user,
			isAuthenticated: !!user,
			isLoading,
			googleSignIn,
			signIn,
			signUp,
			logout,
		}),
		[user, isLoading, googleSignIn, signIn, signUp, logout],
	)

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
