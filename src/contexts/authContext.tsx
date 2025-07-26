import { type UseMutationResult, useMutation } from '@tanstack/react-query'
import {
	createUserWithEmailAndPassword,
	GoogleAuthProvider,
	onAuthStateChanged,
	signInWithEmailAndPassword,
	signInWithPopup,
	signOut,
	type UserCredential,
} from 'firebase/auth'
import { createContext, useEffect, useMemo, useState } from 'react'
import { auth } from '@/firebase/config'
import { useCreateUserDocument } from '@/hooks/useCreateUserDocument'
import type { ISignIn } from '@/types/auth'

interface AuthContextType {
	user: UserCredential['user'] | null
	isAuthenticated: boolean
	isLoading: boolean
	googleSignIn: UseMutationResult<void, Error, void, unknown>
	signIn: UseMutationResult<void, Error, ISignIn, unknown>
	signUp: UseMutationResult<void, Error, ISignIn, unknown>
	logout: UseMutationResult<void, Error, void, unknown>
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [user, setUser] = useState<UserCredential['user'] | null>(null)
	const [isLoading, setIsLoading] = useState(true)

	const { createUserDoc } = useCreateUserDocument()

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			setUser(user)
			setIsLoading(false)
		})
		return () => unsubscribe()
	}, [])

	const googleSignIn = useMutation({
		mutationFn: async () => {
			const { user } = await signInWithPopup(
				auth,
				new GoogleAuthProvider().setCustomParameters({ promp: 'select_account' }),
			)
			await createUserDoc(user, {
				name: user.displayName,
				email: user.email,
				photoURL: user.photoURL,
			})
			setUser(user)
		},
	})

	const signIn = useMutation({
		mutationFn: async ({ email, password }: ISignIn) => {
			const { user } = await signInWithEmailAndPassword(auth, email, password)
			setUser(user)
		},
	})

	const signUp = useMutation({
		mutationFn: async ({ email, password }: ISignIn) => {
			const { user } = await createUserWithEmailAndPassword(auth, email, password)
			await createUserDoc(user, {
				name: user.displayName,
				email: user.email,
			})
			setUser(user)
		},
	})

	const logout = useMutation({
		mutationFn: async () => {
			await signOut(auth)
			setUser(null)
		},
	})

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
