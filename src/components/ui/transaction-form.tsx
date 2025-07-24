import { ChevronDownIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { CurrencyInput } from '@/components/ui/currency-input'
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'

export function TransactionForm() {
	return (
		<Dialog>
			<form id="transaction-form" className="grid gap-4 py-4">
				<DialogTrigger asChild>
					<Button variant="default">Nova Transação</Button>
				</DialogTrigger>
				<DialogContent className="sm:max-w-[425px]">
					<DialogHeader>
						<DialogTitle>Criar Nova Transação</DialogTitle>
						<DialogDescription>Preencha os detalhes para adicionar uma nova transação.</DialogDescription>
					</DialogHeader>
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="amount" className="text-right">
							Valor
						</Label>
						<CurrencyInput id="amount" className="col-span-3" placeholder="R$ 0,00" required />
					</div>

					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="description" className="text-right">
							Descrição
						</Label>
						<Input id="description" className="col-span-3" required />
					</div>

					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="date" className="text-right">
							Data
						</Label>
						<div className="col-span-3">
							<Popover>
								<PopoverTrigger asChild>
									<Button id="date" variant="outline" className="w-48 justify-between font-normal">
										Selecionar data
										<ChevronDownIcon />
									</Button>
								</PopoverTrigger>
								<PopoverContent className="w-auto overflow-hidden p-0" align="start">
									<Calendar mode="single" captionLayout="dropdown" className="rounded-md border" />
								</PopoverContent>
							</Popover>
						</div>
					</div>

					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="category" className="text-right">
							Categoria
						</Label>
						<div className="col-span-3">
							<Select>
								<SelectTrigger id="category" className="w-[180px]">
									<SelectValue placeholder="Categoria" />
								</SelectTrigger>
								<SelectContent>
									<SelectGroup>
										<SelectItem value="Salário">Salário</SelectItem>
										<SelectItem value="Alimentação">Alimentação</SelectItem>
										<SelectItem value="Transporte">Transporte</SelectItem>
										<SelectItem value="Moradia">Moradia</SelectItem>
										<SelectItem value="Saúde">Saúde</SelectItem>
										<SelectItem value="Educação">Educação</SelectItem>
										<SelectItem value="Lazer">Lazer</SelectItem>
										<SelectItem value="Investimentos">Investimentos</SelectItem>
										<SelectItem value="Outro">Outro</SelectItem>
									</SelectGroup>
								</SelectContent>
							</Select>
						</div>
					</div>

					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="type" className="text-right">
							Transação
						</Label>
						<div className="col-span-3">
							<Select>
								<SelectTrigger id="type" className="w-[180px]">
									<SelectValue placeholder="Transação" />
								</SelectTrigger>
								<SelectContent>
									<SelectGroup>
										<SelectItem value="income">Entrada</SelectItem>
										<SelectItem value="expense">Saída</SelectItem>
									</SelectGroup>
								</SelectContent>
							</Select>
						</div>
					</div>

					<DialogFooter>
						<DialogClose asChild>
							<Button variant="outline" type="submit">
								Cancelar
							</Button>
						</DialogClose>
						<Button type="submit" form="transaction-form">
							Criar
						</Button>
					</DialogFooter>
				</DialogContent>
			</form>
		</Dialog>
	)
}
