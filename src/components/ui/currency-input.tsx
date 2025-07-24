import { NumericFormat, type NumericFormatProps } from 'react-number-format'
import { Input } from '@/components/ui/input'

export function CurrencyInput(props: NumericFormatProps) {
	return (
		<NumericFormat
			customInput={Input}
			thousandSeparator="."
			decimalSeparator=","
			prefix="R$ "
			decimalScale={2}
			fixedDecimalScale
			allowNegative={false}
			{...props}
		/>
	)
}
