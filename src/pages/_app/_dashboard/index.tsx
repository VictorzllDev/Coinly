import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/_dashboard/')({
	component: Dashboard,
})

function Dashboard() {
	return <div>Hello "/_app/_dashboard/"!</div>
}
