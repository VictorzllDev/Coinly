import type React from 'react'

const LoadingScreen: React.FC = () => {
	return (
		<div className="flex min-h-screen flex-col items-center justify-center bg-background">
			<img src="/logo.svg" alt="" className="mb-8 h-24 w-24 animate-pulse" />
			<div className="flex items-center justify-center">
				<div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
			</div>
		</div>
	)
}

export default LoadingScreen
