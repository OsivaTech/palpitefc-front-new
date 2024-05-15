import { ReactNode } from "react"

type MenuItemProps = {
    children: ReactNode
    onClick: () => void
}

export const MenuItem = ({children, onClick}: MenuItemProps) => {

    return (
        <li onClick={onClick} className="flex justify-start items-center gap-2 cursor-pointer font-medium text-xs">
            {children}
        </li>
    )
}