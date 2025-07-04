import { Input } from '@/components/ui/input'
import { NumericFormat, type NumericFormatProps } from 'react-number-format'

export const CurrencyInput = (props: NumericFormatProps) => {
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
