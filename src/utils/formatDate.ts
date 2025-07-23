import { firestoreDateToJSDate } from './firestoreDateToJSDate'

export function formatDate(date: unknown) {
	return firestoreDateToJSDate(date).toLocaleDateString('pt-BR', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	})
}
