import { Timestamp } from 'firebase/firestore'

export const firestoreDateToJSDate = (date: unknown): Date => {
	// Se já for Date do JS
	if (date instanceof Date) {
		return date
	}

	// Se for Timestamp do Firestore
	if (date instanceof Timestamp) {
		return date.toDate()
	}

	// Se for string ISO (caso tenha sido salvo como string)
	if (typeof date === 'string') {
		return new Date(date)
	}

	// Caso inválido
	console.warn('Formato de data não reconhecido:', date)
	return new Date() // Fallback para data atual
}
