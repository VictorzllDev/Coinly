import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createRouter, RouterProvider } from '@tanstack/react-router'
import { AuthProvider } from './contexts/authContext'
import { ThemeProvider } from './contexts/ThemeContext'
import { routeTree } from './route-tree.gen'

const queryClient = new QueryClient()

const router = createRouter({ routeTree })
declare module '@tanstack/react-router' {
	interface Register {
		router: typeof router
	}
}

export function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<AuthProvider>
				<ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
					<RouterProvider router={router} />
				</ThemeProvider>
			</AuthProvider>
		</QueryClientProvider>
	)
}
