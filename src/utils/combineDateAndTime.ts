import { setHours, setMinutes, setSeconds } from 'date-fns'

interface CombineDateAndTimeProps {
	date: Date
	time: string
}

export function combineDateAndTime({ date, time }: CombineDateAndTimeProps) {
	const [hour = 0, minute = 0, second = 0] = time.split(':').map(Number)
	return setSeconds(setMinutes(setHours(date, hour), minute), second)
}
