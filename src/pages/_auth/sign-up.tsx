import { createFileRoute } from '@tanstack/react-router'
import { SignUpForm } from './-components/SignUpForm'

export const Route = createFileRoute('/_auth/sign-up')({
	component: SignUp,
	head: () => ({
		meta: [
			{
				title: 'Sign Up | Coinly',
			},
		],
	}),
})

function SignUp() {
	return <SignUpForm />
}
