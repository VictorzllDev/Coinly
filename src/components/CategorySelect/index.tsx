
import { useState, useEffect } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const PREDEFINED_CATEGORIES = [
	'Salário',
	'Alimentação',
	'Transporte',
	'Moradia',
	'Saúde',
	'Educação',
	'Lazer',
	'Investimentos',
]

interface CategorySelectProps {
	value: string
	onChange: (value: string) => void
}

export function CategorySelect({ value, onChange }: CategorySelectProps) {
	const [isOther, setIsOther] = useState(false)
	const [customCategory, setCustomCategory] = useState('')

	useEffect(() => {
		if (value && !PREDEFINED_CATEGORIES.includes(value)) {
			setIsOther(true)
			setCustomCategory(value)
		} else {
			setIsOther(false)
			setCustomCategory('')
		}
	}, [value])

	const handleSelectChange = (selectedValue: string) => {
		if (selectedValue === 'other') {
			setIsOther(true)
			onChange('')
		} else {
			setIsOther(false)
			onChange(selectedValue)
		}
	}

	const handleCustomCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setCustomCategory(e.target.value)
		onChange(e.target.value)
	}

	return (
		<div className="grid grid-cols-4 items-center gap-4">
			<Label htmlFor="category" className="text-right">
				Categoria
			</Label>
			<div className="col-span-3">
				<Select onValueChange={handleSelectChange} value={isOther ? 'other' : value}>
					<SelectTrigger>
						<SelectValue placeholder="Selecione uma categoria" />
					</SelectTrigger>
					<SelectContent>
						{PREDEFINED_CATEGORIES.map((category) => (
							<SelectItem key={category} value={category}>
								{category}
							</SelectItem>
						))}
						<SelectItem value="other">Outra</SelectItem>
					</SelectContent>
				</Select>
				{isOther && (
					<Input
						value={customCategory}
						onChange={handleCustomCategoryChange}
						placeholder="Digite a nova categoria"
						className="mt-2"
					/>
				)}
			</div>
		</div>
	)
}
