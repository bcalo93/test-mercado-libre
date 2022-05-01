import { useState, useEffect } from 'react'

export default function Price({
  amount,
  currency,
  maxFractionDigits = 0,
  className,
}) {
  const [formatter, setFormatter] = useState()

  useEffect(() => {
    setFormatter(
      Intl.NumberFormat(navigator.language, {
        style: 'currency',
        currency,
        maximumFractionDigits: maxFractionDigits,
      })
    )
  }, [currency, maxFractionDigits])

  return formatter ? (
    <span className={className}>{formatter.format(amount)}</span>
  ) : (
    ''
  )
}
