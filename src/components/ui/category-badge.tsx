type ICategoryBadgeProps = {
	category: string
	className?: string
}

const COLORS = [
	// Blues
	'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
	'bg-sky-100 text-sky-800 dark:bg-sky-900 dark:text-sky-200',
	'bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200',

	// Greens
	'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
	'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200',
	'bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200',

	// Yellows/Oranges
	'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200',
	'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
	'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',

	// Reds
	'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
	'bg-rose-100 text-rose-800 dark:bg-rose-900 dark:text-rose-200',
	'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200',

	// Purples
	'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
	'bg-violet-100 text-violet-800 dark:bg-violet-900 dark:text-violet-200',
	'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200',
	'bg-fuchsia-100 text-fuchsia-800 dark:bg-fuchsia-900 dark:text-fuchsia-200',

	// Grays
	'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200',
	'bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-200',
	'bg-zinc-100 text-zinc-800 dark:bg-zinc-700 dark:text-zinc-200',
	'bg-stone-100 text-stone-800 dark:bg-stone-700 dark:text-stone-200',
]

export function getCategoryColor(category: string) {
	const hash = (category || '').split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
	const index = Math.abs(hash) % COLORS.length
	return COLORS[index]
}

export function CategoryBadge({ category, className = '' }: ICategoryBadgeProps) {
	const colorClasses = getCategoryColor(category)

	return (
		<span
			className={`inline-flex items-center rounded-full px-2.5 py-0.5 font-medium text-xs ${colorClasses} ${className}`}
		>
			{category}
		</span>
	)
}
