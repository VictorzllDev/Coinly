import { setHours, setMinutes } from 'date-fns'

interface CombineDateAndTimeProps {
	date: Date
	time: string
}

export function combineDateAndTime({ date, time }: CombineDateAndTimeProps) {
	const [hour, minute] = time.split(':').map(Number)
	return setMinutes(setHours(date, hour), minute)
}
