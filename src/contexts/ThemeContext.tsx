import { createContext, useEffect, useState } from 'react'

type Theme = 'dark' | 'light' | 'system'

interface ThemeContextType {
	theme: Theme
	setThemeMode: (theme: Theme) => void
}

const initialState: ThemeContextType = {
	theme: 'system',
	setThemeMode: () => null,
}

export const ThemeContext = createContext<ThemeContextType>(initialState)

interface ThemeProviderProps {
	children: React.ReactNode
	defaultTheme?: Theme
	storageKey?: string
}

export function ThemeProvider({
	children,
	defaultTheme = 'system',
	storageKey = 'vite-ui-theme',
	...props
}: ThemeProviderProps) {
	const [theme, setTheme] = useState<Theme>(() => (localStorage.getItem(storageKey) as Theme) || defaultTheme)

	useEffect(() => {
		const root = window.document.documentElement

		root.classList.remove('light', 'dark')

		if (theme === 'system') {
			const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'

			root.classList.add(systemTheme)
			return
		}

		root.classList.add(theme)
	}, [theme])

	function setThemeMode(theme: Theme) {
		localStorage.setItem(storageKey, theme)
		setTheme(theme)
	}

	const value = {
		theme,
		setThemeMode,
	}

	return (
		<ThemeContext.Provider {...props} value={value}>
			{children}
		</ThemeContext.Provider>
	)
}
