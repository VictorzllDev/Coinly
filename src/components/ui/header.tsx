export function Header() {
	return (
		<header className="fixed top-0 flex h-16 w-full items-center justify-between bg-white px-6 py-4 shadow-sm">
			<div className="flex items-center">
				<img src="/logo.svg" alt="Coinly Logo" className="mr-3 h-8" />
				<h1 className="font-bold text-2xl text-gray-800">Coinly</h1>
			</div>
		</header>
	)
}
