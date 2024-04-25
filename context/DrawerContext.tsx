import React, { useState, createContext, useContext } from 'react'

interface DrawerContextType {
    open: boolean,
    setOpen: (value: boolean) => void
}

const DrawerContext = createContext<DrawerContextType | undefined>(undefined);



const DrawerNavigatorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [open, setOpen] = useState<boolean>(false)

    return (
        <DrawerContext.Provider value={{ open, setOpen }}>
            {children}
        </DrawerContext.Provider>
    )
}

const useDrawerContext = () => {
    const context = useContext(DrawerContext);
    if (!context) {
        throw new Error('DraweContext must be used within a DrawerProvider');
    }
    return context;
};

export { useDrawerContext , DrawerNavigatorProvider }