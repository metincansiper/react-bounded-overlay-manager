import React, { createContext, useContext, useEffect, useState, PropsWithChildren } from 'react';
import EventEmitter from 'eventemitter3';

// Define the context type
interface OverlayManagerContextType {
  overlayManagerEventEmitter: EventEmitter;
}

const OverlayManagerContext = createContext<OverlayManagerContextType | undefined>(undefined);

export const useOverlayManagerContext = () => {
  const context = useContext(OverlayManagerContext);
  if (context === undefined) {
    throw new Error('useOverlayManagerContext must be used within a OverlayManagerContextProvider');
  }
  return context;
};

export const OverlayManagerContextProvider: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  const [eventEmitter] = useState(new EventEmitter());

  useEffect(() => {
    return () => {
      eventEmitter.removeAllListeners();
    };
  }, [eventEmitter]);

  // Providing the EventEmitter in an object with the key `overlayManagerEventEmitter`
  return (
    <OverlayManagerContext.Provider value={{ overlayManagerEventEmitter: eventEmitter }}>
      {children}
    </OverlayManagerContext.Provider>
  );
};
