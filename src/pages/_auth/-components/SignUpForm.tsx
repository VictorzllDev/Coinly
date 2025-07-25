import { zodResolver } from '@hookform/resolvers/zod'
import { Link } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'

const signUpFormSchema = z.object({
	email: z.email({ message: 'O e-mail é inválido' }),
	password: z.string().min(6, { message: 'A senha deve ter no mínimo 6 caracteres' }),
})

export type SignUpFormInputs = z.infer<typeof signUpFormSchema>

export function SignUpForm({ className, ...props }: React.ComponentProps<'form'>) {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<SignUpFormInputs>({
		resolver: zodResolver(signUpFormSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	})

	const onSubmit = (data: SignUpFormInputs) => {
		console.log('Dados do formulário:', data)

		reset()
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)} className={cn('flex flex-col gap-6', className)} {...props}>
			<div className="flex flex-col items-center gap-2 text-center">
				<h1 className="font-bold text-2xl">Crie sua conta</h1>
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
					</div>
					<Input id="password" type="password" {...register('password')} />
					{errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
				</div>
				<Button type="submit" className="w-full">
					Criar conta
				</Button>
			</div>
			<div className="text-center text-sm">
				Ja possui uma conta?{' '}
				<Link to="/sign-in" className="underline underline-offset-4">
					Login
				</Link>
			</div>
		</form>
	)
}
