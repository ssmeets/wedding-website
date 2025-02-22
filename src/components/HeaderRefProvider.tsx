"use client"
import React, { createContext, useRef, useState, useEffect } from 'react';

interface HeaderRefContextType {
    headerRef: React.RefObject<HTMLElement>;
}

export const HeaderRefContext = createContext<HeaderRefContextType | null>(null);

import { ReactNode } from 'react';

interface HeaderRefProviderProps {
    children: ReactNode;
}

export const HeaderRefProvider = ({ children }: HeaderRefProviderProps) => {
    const headerRef = useRef<HTMLElement>(null);
    const [contextValue, setContextValue] = useState({ headerRef });

    useEffect(() => {
        // Update context value when headerRef changes
        setContextValue({ headerRef });
    }, [headerRef.current]);

    return (
        <HeaderRefContext.Provider value={contextValue}>
            {children}
        </HeaderRefContext.Provider>
    );
};