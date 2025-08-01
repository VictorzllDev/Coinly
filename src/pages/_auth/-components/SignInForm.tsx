import { zodResolver } from '@hookform/resolvers/zod'
import { Link } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAuth } from '@/hooks/auth/useAuth'
import { cn } from '@/lib/utils'

const signInFormSchema = z.object({
	email: z.email({ message: 'O e-mail é inválido' }),
	password: z.string().min(1, { message: 'A senha é obrigatória' }),
})

export type SignInFormInputs = z.infer<typeof signInFormSchema>

export function SignInForm({ className, ...props }: React.ComponentProps<'form'>) {
	const { googleSignIn, signIn } = useAuth()

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<SignInFormInputs>({
		resolver: zodResolver(signInFormSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	})

	const onSubmit = ({ email, password }: SignInFormInputs) => {
		signIn.mutate({ email, password })
	}

	const handleGoogleSignIn = () => {
		googleSignIn.mutate()
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)} className={cn('flex flex-col gap-6', className)} {...props}>
			<div className="flex flex-col items-center gap-2 text-center">
				<h1 className="font-bold text-2xl">Faça login na sua conta</h1>
				<p className="text-balance text-muted-foreground text-sm">Digite seu e-mail abaixo para acessar sua conta</p>
			</div>
			<div className="grid gap-6">
				<div className="grid gap-3">
					<Label htmlFor="email">Email</Label>
					<Input id="email" type="text" placeholder="exemplo@email.com" autoComplete="email" {...register('email')} />
					{errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
				</div>
				<div className="grid gap-3">
					<div className="flex items-center">
						<Label htmlFor="password">Senha</Label>
						<Link to="." className="ml-auto text-sm underline-offset-4 hover:underline">
							Esqueceu sua senha?
						</Link>
					</div>
					<Input id="password" type="password" {...register('password')} />
					{errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
				</div>
				<Button type="submit" isLoading={signIn.isPending} className="w-full">
					Login
				</Button>
				<div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-border after:border-t">
					<span className="relative z-10 bg-background px-2 text-muted-foreground">Ou continue com</span>
				</div>
				<Button
					type="button"
					variant="outline"
					onClick={handleGoogleSignIn}
					isLoading={googleSignIn.isPending}
					className="w-full cursor-pointer"
				>
					<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
						<title>Google</title>
						<path stroke="none" d="M0 0h24v24H0z" fill="none" />
						<path d="M12 2a9.96 9.96 0 0 1 6.29 2.226a1 1 0 0 1 .04 1.52l-1.51 1.362a1 1 0 0 1 -1.265 .06a6 6 0 1 0 2.103 6.836l.001 -.004h-3.66a1 1 0 0 1 -.992 -.883l-.007 -.117v-2a1 1 0 0 1 1 -1h6.945a1 1 0 0 1 .994 .89c.04 .367 .061 .737 .061 1.11c0 5.523 -4.477 10 -10 10s-10 -4.477 -10 -10s4.477 -10 10 -10z" />
					</svg>
					Login com Google
				</Button>
			</div>
			<div className="text-center text-sm">
				Não tem uma conta?{' '}
				<Link to="/sign-up" className="underline underline-offset-4">
					Inscrever-se
				</Link>
			</div>
		</form>
	)
}
