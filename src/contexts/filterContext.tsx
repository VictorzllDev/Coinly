import { createContext, useState } from 'react'

export interface IFilters {
	selectedCategory: string | null
	minAmount: number
	maxAmount: number
	transactionType: 'all' | 'income' | 'expense'
}

interface FilterContextType {
	filters: IFilters
	setFilters: React.Dispatch<React.SetStateAction<IFilters>>
}

export const FilterContext = createContext<FilterContextType | undefined>(undefined)

export const FilterProvider = ({ children }: { children: React.ReactNode }) => {
	const [filters, setFilters] = useState<IFilters>({
		selectedCategory: null,
		minAmount: 0,
		maxAmount: 0,
		transactionType: 'all',
	})

	return (
		<FilterContext.Provider
			value={{
				filters,
				setFilters,
			}}
		>
			{children}
		</FilterContext.Provider>
	)
}
