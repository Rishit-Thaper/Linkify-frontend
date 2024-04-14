import { LinkContext, LinkContextType } from '../contexts/LinkContext';
import { useContext } from 'react';
export const useLinkContext = (): LinkContextType => {
    const context = useContext(LinkContext);
    if (!context) {
        throw new Error('useLinkContext must be used within a LinkProvider');
    }
    return context;
};
