import { signOut } from 'firebase/auth'
import { auth } from '@/firebase/config'

export async function logout() {
	await signOut(auth)
}
