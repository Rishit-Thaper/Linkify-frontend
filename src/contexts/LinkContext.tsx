import React, { createContext, useState, ReactNode } from 'react';

export interface LinkContextType {
    selectedLinkId: string | null;
    setSelectedLinkId: React.Dispatch<React.SetStateAction<string | null>>;
}

export const LinkContext = createContext<LinkContextType | undefined>(undefined);

export const LinkContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [selectedLinkId, setSelectedLinkId] = useState<string | null>(null);

    return <LinkContext.Provider value={{ selectedLinkId, setSelectedLinkId }}>{children}</LinkContext.Provider>;
};
