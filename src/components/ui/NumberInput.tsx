'use client'
import * as React from 'react'
import { cn } from '@/lib/utils'

type NumberInputProps = {
  value?: number
  min?: number
  max?: number
  step?: number
  onChange?: (value: number) => void
  className?: string
}

export function NumberInput({
  value = 1,
  min = 1,
  max = 999,
  step = 1,
  onChange,
  className
}: NumberInputProps) {
  const [val, setVal] = React.useState<number>(value)

  const handleChange = (newVal: number) => {
    if (newVal < min || newVal > max) return
    setVal(newVal)
    onChange?.(newVal)
  }

  return (
    <div
      className={cn(
        'flex items-center border rounded-xl overflow-hidden max-w-40 shadow-sm py-1 font-medium',
        className
      )}
    >
      <button
        type="button"
        onClick={() => handleChange(val - step)}
        className="mx-1 px-4 py-1 text-xl font-extrabold text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-100"
      >
        -
      </button>

      <input
        type="number"
        value={val}
        min={min}
        max={max}
        onChange={(e) => handleChange(Number(e.target.value))}
        readOnly={true}
        className="w-full text-center outline-none border-0 focus:ring-0 font-medium text-(--text-title)"
      />

      <button
        type="button"
        onClick={() => handleChange(val + step)}
        className="mx-1 px-4 py-1 text-xl font-bold text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-100"
      >
        +
      </button>
    </div>
  )
}
