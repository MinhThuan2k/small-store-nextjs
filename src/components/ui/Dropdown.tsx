'use client'
import * as React from 'react'
import { cn } from '@/lib/utils'

type DropdownProps = {
  title?: string
  data: Record<any, any>[] | []
  className?: string
  classNameBtn?: string
  onChange?: (value: string) => void
  defaultValue?: string | object | null
  renderItem?: (item: any) => React.ReactNode
  renderSelected?: (item: any) => React.ReactNode
}

export function Dropdown({
  title,
  data,
  className,
  classNameBtn,
  onChange,
  defaultValue = '',
  renderItem,
  renderSelected
}: DropdownProps) {
  const [open, setOpen] = React.useState(false)
  const [selected, setSelected] = React.useState<any>()
  const dropdownRef = React.useRef<HTMLDivElement>(null)

  const selectedItem = data.find((d) => d === selected) || null

  const handleSelect = (value: any) => {
    setSelected(value)
    setOpen(false)
    onChange?.(value)
  }

  React.useEffect(() => {
    if (defaultValue) {
      setSelected(defaultValue)
    }
  }, [defaultValue])

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div
      ref={dropdownRef}
      className={cn('relative w-full min-h-12 text-(--text-title)', className)}
    >
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={cn(
          'w-full h-full px-3 py-4 border border-gray-200 rounded-xl shadow flex justify-between items-center text-left bg-white',
          'hover:border-[#25CBD6] transition-all duration-200',
          open && 'rounded-bl-none rounded-br-none',
          classNameBtn
        )}
      >
        <span className="text-(--text-title)">
          {renderSelected
            ? renderSelected(selectedItem)
            : selectedItem
              ? selectedItem.label
              : title || 'Select an option'}
        </span>
        <svg
          className={cn(
            'w-4 h-4 transition-transform duration-200',
            open ? 'rotate-180' : ''
          )}
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {open && (
        <div className="absolute left-0 top-[100%] z-20 w-full bg-white border border-gray-200 rounded-bl-xl rounded-br-xl shadow-lg max-h-60 overflow-y-auto">
          {data.map((item, key) => (
            <div
              key={key}
              onClick={() => handleSelect(item)}
              className={cn(
                'px-3 py-4 text-[14px] font-normal cursor-pointer select-none transition-colors hover:bg-[#c7d6d6]'
              )}
            >
              {renderItem ? renderItem(item) : item.label}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
