import type { User } from 'firebase/auth'

export interface IUserData {
	name: string | null
	avatar: string | null
	createdAt: Date
}

export type IUser = User & IUserData
