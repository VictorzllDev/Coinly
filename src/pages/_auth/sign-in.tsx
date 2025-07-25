import { createFileRoute } from '@tanstack/react-router'
import { SignInForm } from './-components/SignInForm'

export const Route = createFileRoute('/_auth/sign-in')({
	component: SignIn,
	head: () => ({
		meta: [
			{
				title: 'Sign In | Coinly',
			},
		],
	}),
})

function SignIn() {
	return <SignInForm />
}
