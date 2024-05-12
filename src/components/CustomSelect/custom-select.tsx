import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import React, { ReactNode, useState } from "react"
import * as SheetPrimitive from "@radix-ui/react-dialog"

import { League } from "@/shared/types/League"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ChevronDown, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

type DataProps = {
    id: string,
    name: string
}

export interface CustomSelect {
    title: string
    data: DataProps[]
    onValueChange?: (value: string) => void
}  

export const CustomSelect = ({title, data, onValueChange}: CustomSelect ) => {
    const [open, setOpen] = React.useState(false);
    const [selectedItem, setSelectedItem] = useState<DataProps | null>(null)

    const onSelect = (id: string) => {
        setOpen(false)
        setSelectedItem(data.filter(f => f.id === id)[0])
        onValueChange && onValueChange(id)
    }

    const onClear = () => {
        onValueChange && onValueChange('0')
        setSelectedItem(null)
    }

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <div className="flex-1 flex gap-2 items-center">
                {selectedItem !== null && (
                    <Badge className="p-0" onClick={onClear}>
                        <X size={20}  />
                    </Badge>
                )}
                <SheetTrigger asChild>
                    <Button className={cn("text-xs p-2 self-start items-center justify-between border border-white h-[30px] w-full bg-app-background text-white ring-offset-0 active:border-1 rounded-full"
                        , selectedItem !== null && "text-black bg-white" 
                    )}>
                        {selectedItem 
                            && selectedItem.name !== null ? 
                                selectedItem.name :
                                    title ?? 'Selecione um item'}
                        <ChevronDown size={16} />
                    </Button>
                </SheetTrigger>
            </div>

            <SheetContent className="py-4">
                <SheetHeader className="border-b border-b-white">
                    <SheetTitle className="flex justify-start items-center gap-2 pb-2"> 
                        <SheetClose >
                            <ArrowLeft size={18} />
                        </SheetClose>
                        {title}
                    </SheetTitle>
                </SheetHeader>
                <SheetDescription>
                    <ol className=" font-medium w-full  flex flex-col justify-center items-center gap-5 mt-6">
                        {data?.map(d => (
                            <li onClick={() => onSelect(d.id.toString())} className="text-white" key={d.id}>{d.name}</li>
                        ))}
                    </ol>
                </SheetDescription>
            </SheetContent>
        </Sheet>
    )
}