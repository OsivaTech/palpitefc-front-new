"use client"

import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"


import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"

type DatePickerProps = {
    label: string
    selected: any,
    onSelect: any
}
export function DatePicker({label, onSelect, selected}: DatePickerProps) {
         
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          className={cn(
            "justify-start w-full bg-app-background h-[38px] rounded-full placeholder:uppercase text-white px-[20px] py-[12px] font-medium text-xs ",
            !selected && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {selected ? format(selected, "PPP") : <span>{label || 'Pick a date'} </span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
         className="bg-transparent"
          selected={selected}
          onSelect={onSelect}
          fromYear={1960}
          toYear={new Date().getFullYear()}
          mode="single"
          captionLayout="dropdown-buttons"
        />
      </PopoverContent>
    </Popover>
  )
}
