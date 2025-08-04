import { createFileRoute } from '@tanstack/react-router'
import { Camera, User } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAuth } from '@/hooks/auth/useAuth'
import { firestoreDateToJSDate } from '@/utils/firestoreDateToJSDate'
import { formatDate } from '@/utils/formatDate'

export const Route = createFileRoute('/_app/my-account/')({
	component: MyAccount,
})

export default function MyAccount() {
	const { user } = useAuth()
	if (!user) throw new Error('User not found')

	return (
		<div className="space-y-6 px-4">
			<div className="mx-auto max-w-2xl px-4">
				<div className="my-4 space-y-1">
					<h1 className="font-bold text-2xl tracking-tight sm:text-3xl">Minha Conta</h1>
					<p className="text-muted-foreground text-sm md:text-base">Gerencie as informações do seu perfil</p>
				</div>

				<Card>
					<CardHeader>
						<CardTitle>Informações do Perfil</CardTitle>
						<CardDescription>Atualize seus dados pessoais</CardDescription>
					</CardHeader>
					<CardContent className="space-y-6">
						{/* Avatar Section */}
						<div className="flex flex-col items-center space-y-4">
							<div className="relative">
								<Avatar className="h-24 w-24">
									<AvatarImage src={user.avatar || undefined} alt={user.name || undefined} />
									<AvatarFallback className="text-lg">
										<User className="h-8 w-8" />
									</AvatarFallback>
								</Avatar>
								<Button
									size="sm"
									variant="outline"
									className="-bottom-2 -right-2 absolute h-8 w-8 rounded-full bg-transparent p-0"
									disabled
								>
									<Camera className="h-4 w-4" />
								</Button>
							</div>
							<div className="text-center">
								<Button variant="outline" size="sm" disabled>
									Alterar Avatar
								</Button>
								<p className="mt-2 text-gray-500 text-sm">JPG, PNG ou GIF. Tamanho máximo 2MB.</p>
							</div>
						</div>

						{/* Form Fields */}
						<div className="grid gap-6">
							<div className="grid gap-2">
								<Label htmlFor="name">Nome</Label>
								<Input id="name" placeholder="Digite seu nome" defaultValue={user.name || undefined} disabled />
							</div>

							<div className="grid gap-2">
								<Label htmlFor="email">Email</Label>
								<Input
									id="email"
									type="email"
									placeholder="Digite seu email"
									defaultValue={user.email || undefined}
									disabled
								/>
							</div>

							<div className="grid gap-2">
								<Label htmlFor="created">Conta criada em</Label>
								<Input
									id="created"
									defaultValue={formatDate(firestoreDateToJSDate(user.createdAt))}
									disabled
									className="bg-gray-50"
								/>
							</div>
						</div>

						{/* Action Buttons */}
						<div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
							<Button disabled>Salvar Alterações</Button>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	)
}
