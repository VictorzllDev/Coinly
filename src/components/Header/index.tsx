import React from 'react'

export const Header: React.FC = () => {
	return (
		<header className="bg-white shadow-sm py-4 px-6 flex items-center justify-between">
			<div className="flex items-center">
				<img src="/logo.svg" alt="Coinly Logo" className="h-8 mr-3" />
				<h1 className="text-2xl font-bold text-gray-800">Coinly</h1>
			</div>
			{/* Add any navigation or user elements here later if needed */}
		</header>
	)
}
