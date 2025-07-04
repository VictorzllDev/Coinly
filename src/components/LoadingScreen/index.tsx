import React from 'react'

const LoadingScreen: React.FC = () => {
	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-background">
			<img src="/logo.svg" alt="" className="h-24 w-24 mb-8 animate-pulse" />
			<div className="flex items-center justify-center">
				<div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
			</div>
		</div>
	)
}

export default LoadingScreen
