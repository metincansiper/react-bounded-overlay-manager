import React, { createContext, useContext, useEffect, useState, PropsWithChildren } from 'react';
import EventEmitter from 'eventemitter3';

// Define the context type
interface OverlayManagerContextType {
  overlayManagerEventEmitter: EventEmitter;
  boundingComponentRef: React.RefObject<HTMLElement>;
}

type Props = {
  boundingComponentRef: React.RefObject<HTMLElement>;
};

const OverlayManagerContext = createContext<OverlayManagerContextType | undefined>(undefined);

export const useOverlayManagerContext = () => {
  const context = useContext(OverlayManagerContext);
  if (context === undefined) {
    throw new Error('useOverlayManagerContext must be used within a OverlayManagerContextProvider');
  }
  return context;
};

export const OverlayManagerContextProvider: React.FC<PropsWithChildren<Props>> = ({ children, boundingComponentRef }) => {
  const [eventEmitter] = useState(new EventEmitter());

  useEffect(() => {
    return () => {
      eventEmitter.removeAllListeners();
    };
  }, [eventEmitter]);

  const contextValue = {
    overlayManagerEventEmitter: eventEmitter,
    boundingComponentRef,
  };

  // Providing the EventEmitter in an object with the key `overlayManagerEventEmitter`
  return (
    <OverlayManagerContext.Provider value={contextValue}>
      {children}
    </OverlayManagerContext.Provider>
  );
};
