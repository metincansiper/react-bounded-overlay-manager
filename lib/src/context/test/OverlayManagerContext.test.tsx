import { render, cleanup, screen } from '@testing-library/react';
import { OverlayManagerContextProvider, useOverlayManagerContext } from '../OverlayManagerContext';
import { EventEmitter } from 'events';

// Helper component for testing context
const TestComponent = () => {
  const { overlayManagerEventEmitter, boundingComponentRef } = useOverlayManagerContext();

  return (
    <div>
        {overlayManagerEventEmitter instanceof EventEmitter ? <div data-testid="eventEmitter"/> : null}
        {boundingComponentRef.current ? <div data-testid="boundingComponentRef"/> : null}
    </div>
  );
};

describe('OverlayManagerContext', () => {
  afterEach(cleanup);

  it('provides overlayManagerEventEmitter and boundingComponentRef', () => {
    render(
      <OverlayManagerContextProvider boundingComponentRef={{ current: document.createElement('div') }}>
        <TestComponent />
      </OverlayManagerContextProvider>
    );

    expect(screen.getByTestId('eventEmitter')).not.toBeNull();
    expect(screen.getByTestId('boundingComponentRef')).not.toBeNull();
  });

  it('throws error when used outside provider', () => {
    const renderOutsideProvider = () => {
      render(<TestComponent />);
    };

    expect(renderOutsideProvider).toThrow('useOverlayManagerContext must be used within a OverlayManagerContextProvider');
  });

  it('cleans up eventEmitter listeners on unmount', () => {
    const removeAllListenersSpy = jest.spyOn(EventEmitter.prototype, 'removeAllListeners');

    const { unmount } = render(
      <OverlayManagerContextProvider boundingComponentRef={{ current: document.createElement('div') }}>
        <div>Test Component</div>
      </OverlayManagerContextProvider>
    );

    unmount();

    expect(removeAllListenersSpy).toHaveBeenCalled();

    removeAllListenersSpy.mockRestore();
  });
});
