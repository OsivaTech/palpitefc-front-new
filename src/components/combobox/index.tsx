"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { CustomButton } from "@/components/custom-button"
import { CommandList } from "cmdk"
import Image from "next/image"

type ComboboxData = {
    value: string
    label: string
    imageLink?: string
}

type ComboboxPropx = {
   data: ComboboxData[]
   errorLabel: string
   searchLabel: string
   onChange: (value:any) => void
   value: any
}
export function Combobox({data, errorLabel, searchLabel, onChange, value}: ComboboxPropx) {
    const [open, setOpen] = React.useState(false)

    const currentValue = data?.find((d) => d.value === value)

    const handleChange = React.useCallback((item: ComboboxData) => {
        setOpen(false)
        onChange(item.value === value ? "" : item.value)
    }, [onChange, value])

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
            <CustomButton
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="justify-between hover:bg-transparent"
            >
                <div className="flex justify-start items-center gap-2">
                    {currentValue?.imageLink && (
                        <Image src={currentValue?.imageLink} width={20} height={20} alt="" />
                    ) }
                    {value
                    ? data?.find((d) => d.value === value)?.label
                    : searchLabel }
                </div>

                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </CustomButton>
            </PopoverTrigger>
            <PopoverContent className="min-w-[400px] max-h-96 overflow-y-scroll p-0">
            <Command>
                <CommandInput placeholder="Search framework..." />
                <CommandList className="w-full">
                <CommandEmpty>{errorLabel}</CommandEmpty>
                <CommandGroup >
                    {data?.map((item) => (
                    <CommandItem
                        className="gap-2 "
                        key={item.value}
                        value={item.value}
                        onSelect={() => handleChange(item)}
                    >
                        {item.imageLink && (
                            <Image src={item?.imageLink} width={20} height={20} alt="" />
                        )}
                        {item.label}
                        <Check
                            className={cn(
                                "mr-2 h-4 w-4 text-white",
                                value === item.value ? "opacity-100" : "opacity-0"
                            )}
                        />
                    </CommandItem>
                    ))}
                </CommandGroup>
                </CommandList>

            </Command>
            </PopoverContent>
        </Popover>
    )
}
