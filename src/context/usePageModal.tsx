'use client'

import React, { ReactNode, createContext, useContext, useState } from 'react';

type PageModalContextType = {
    isOpen: boolean;
    renderPageModal?: ReactNode;
    openPageModal: () => void;
    closePageModal: () => void;
    render: (renderPageModal: ReactNode) => void;
};
const PageModalContext = createContext<PageModalContextType | undefined>(undefined);

const PageModalProvider = ({ children }:{children: ReactNode}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [renderPageModal, setRenderPageModal] = useState<ReactNode | undefined>();
    
    const render = (renderPageModal: ReactNode) => {
        setRenderPageModal(renderPageModal);
    }
    const openPageModal = () => {
        setIsOpen(true);
    };
    const closePageModal = () => {
        setIsOpen(false);
        render(<></>)
    };
    return (
        <PageModalContext.Provider value={{ isOpen, renderPageModal , openPageModal, closePageModal, render }}>
            {children}
        </PageModalContext.Provider>
    );
};
const usePageModal = () => { 
    const pageModalContext = useContext(PageModalContext); 
    if (!pageModalContext) { 
        throw new Error("usePageModal must be used within a PageModalProvider"); 
    } 
    return pageModalContext; 
};
export { PageModalContext, PageModalProvider, usePageModal };