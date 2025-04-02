'use client'

import * as React from 'react'
import { format } from 'date-fns'
import { Calendar as CalendarIcon } from 'lucide-react'

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { cn } from '@/lib/utils'
import { ptBR } from 'date-fns/locale'
import { useState } from 'react'

type DatePickerProps = {
  label?: string
  placeholder: string
  selected: Date | null
  onSelect: (date?: Date) => void
  disabled?: boolean
}

export function DatePicker({
  label,
  placeholder,
  selected,
  onSelect,
  disabled,
}: DatePickerProps) {
  const [open, setOpen] = useState(false)
  return (
    <Popover onOpenChange={setOpen} open={open}>
      <label className="block text-white text-sm font-medium mb-1">
        {label}
      </label>
      <PopoverTrigger asChild>
        <Button
          disabled={disabled}
          className={cn(
            'justify-start w-full rounded-lg border-app-secondary text-white px-[20px] py-[12px] font-medium text-xs bg-white/10 ',
            !selected && 'text-muted-foreground',
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4 text-white" />
          {selected ? (
            selected?.toDateString() === new Date().toDateString() ? (
              'Hoje'
            ) : (
              format(selected, 'dd MMM yyyy', { locale: ptBR })
            )
          ) : (
            <span className="text-white">{placeholder || 'Pick a date'} </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          className="bg-transparent"
          mode="single"
          selected={selected || undefined}
          onSelect={onSelect}
          captionLayout="dropdown-buttons"
          lang="pt-BR"
          disabled={(date) => {
            const today = new Date()
            const maxDate = new Date()
            maxDate.setDate(today.getDate() + 7)
            return date > maxDate
          }}
          onDayClick={() => setOpen(false)}
        />
      </PopoverContent>
    </Popover>
  )
}
