import React, {createContext, useContext, ReactNode, useState} from 'react';

interface StoreContextType {
  secretKey: string;
  setSecretKey: (key: string) => void;
  notes: string[];
  addNotes: (note: string) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

interface ProviderNotesProps {
  children: ReactNode;
}

const ProviderNotes = ({children}: ProviderNotesProps) => {
  const [notes, setNotes] = useState<string[]>([]);
  const [secretKey, setSecretKey] = useState<string>('');

  const addNotes = (note: string) => {
    setNotes([...notes, note]);
  };

  return (
    <StoreContext.Provider value={{notes, addNotes, secretKey, setSecretKey}}>
      {children}
    </StoreContext.Provider>
  );
};

const useNotes = () => {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error('store must be used within a ProviderNotes');
  }
  return context;
};

export {ProviderNotes, useNotes};
