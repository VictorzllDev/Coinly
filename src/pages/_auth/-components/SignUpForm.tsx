import { Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'

export function SignUpForm({ className, ...props }: React.ComponentProps<'form'>) {
	return (
		<form className={cn('flex flex-col gap-6', className)} {...props}>
			<div className="flex flex-col items-center gap-2 text-center">
				<h1 className="font-bold text-2xl">Crie sua conta</h1>
				<p className="text-balance text-muted-foreground text-sm">Digite seu e-mail abaixo para acessar sua conta</p>
			</div>
			<div className="grid gap-6">
				<div className="grid gap-3">
					<Label htmlFor="email">Email</Label>
					<Input id="email" type="email" placeholder="exemplo@email.com" required />
				</div>
				<div className="grid gap-3">
					<div className="flex items-center">
						<Label htmlFor="password">Senha</Label>
					</div>
					<Input id="password" type="password" required />
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
