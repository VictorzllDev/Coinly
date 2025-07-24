import { createContext, useState } from 'react'

export interface IFilters {
	selectedCategory: string | null
	minAmount: number | ''
	maxAmount: number | ''
	transactionType: 'all' | 'income' | 'expense'
}

interface FilterContextType {
	filters: IFilters
	setFilters: React.Dispatch<React.SetStateAction<IFilters>>
	resetFilters: () => void
}

export const FilterContext = createContext<FilterContextType | undefined>(undefined)

export const FilterProvider = ({ children }: { children: React.ReactNode }) => {
	const [filters, setFilters] = useState<IFilters>({
		selectedCategory: null,
		minAmount: '',
		maxAmount: '',
		transactionType: 'all',
	})

	const resetFilters = () => {
		setFilters({
			selectedCategory: null,
			minAmount: '',
			maxAmount: '',
			transactionType: 'all',
		})
	}

	return (
		<FilterContext.Provider
			value={{
				filters,
				setFilters,
				resetFilters,
			}}
		>
			{children}
		</FilterContext.Provider>
	)
}
