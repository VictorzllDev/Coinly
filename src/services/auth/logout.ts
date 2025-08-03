import { signOut } from 'firebase/auth'
import { auth } from '@/firebase/config'

export async function logout() {
	await new Promise((resolve) => setTimeout(resolve, 200))
	await signOut(auth)
}
