'use client'
import { Sheet, SheetContent } from '@/components/ui/sheet'
import { usePageModal } from '@/context/usePageModal'

export const ModalPage = () => {
  const { isOpen, renderPageModal } = usePageModal()
  return (
    <Sheet modal open={isOpen}>
      <SheetContent
        side="left"
        className="h-full overflow-auto w-screen bg-app-secondary grid grid-rows-[min-content_max-content]"
      >
        {renderPageModal}
      </SheetContent>
    </Sheet>
  )
}
