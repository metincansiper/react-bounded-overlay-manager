import { renderHook } from '@testing-library/react';
import useTimedEventManager from '../useTimedEventManager';

import TimedEventManager, { NO_TIMEOUT } from '../../timer/TimedEventManager';

const requestStopMock = jest.fn();

// Mock the specific methods on the prototype
TimedEventManager.prototype.requestStop = requestStopMock;

describe('useTimedEventManager', () => {
    let onStartMock: jest.Mock;
    let onStopMock: jest.Mock;
    const timeoutDuration = 1000;

    beforeEach(() => {
        onStartMock = jest.fn();
        onStopMock = jest.fn();
    });

    it('should return null when returnNull is true', () => {
        const { result } = renderHook(() => useTimedEventManager({ onStart: onStartMock, onStop: onStopMock, timeoutDuration, returnNull: true }));
        expect(result.current).toBeNull();
    });

    it('should create a new TimedEventManager instance when returnNull is false', () => {
        const { result } = renderHook(() => useTimedEventManager({ onStart: onStartMock, onStop: onStopMock, timeoutDuration, returnNull: false }));
        expect(result.current).toBeInstanceOf(TimedEventManager);
    });

    it('should call requestStop on unmount', () => {
        const { unmount } = renderHook(() => useTimedEventManager({ onStart: onStartMock, onStop: onStopMock, timeoutDuration }));
        unmount();
        expect(requestStopMock).toHaveBeenCalled();
    });

    it('should reuse the same TimedEventManager instance if dependencies are unchanged', () => {
        const { result, rerender } = renderHook(() =>
            useTimedEventManager({ onStart: onStartMock, onStop: onStopMock, timeoutDuration })
        );
        const firstInstance = result.current;

        // Re-render the hook with the same dependencies
        rerender();

        const secondInstance = result.current;

        // The instances should be the same
        expect(firstInstance).toBe(secondInstance);
    });

    it('should create a new instance when a dependency changes', () => {
        let timeoutDuration = 1000;
        const { result, rerender } = renderHook(() =>
            useTimedEventManager({ onStart: onStartMock, onStop: onStopMock, timeoutDuration })
        );
    
        const firstInstance = result.current;
    
        // Modify one of the dependencies
        timeoutDuration = 2000;
        rerender(() => useTimedEventManager({ onStart: onStartMock, onStop: onStopMock, timeoutDuration }));
    
        const secondInstance = result.current;
    
        // The instances should not be the same
        expect(firstInstance).not.toBe(secondInstance);
    });
    

    it('should handle NO_TIMEOUT case correctly', () => {
        const { result } = renderHook(() => useTimedEventManager({ onStart: onStartMock, onStop: onStopMock, timeoutDuration: NO_TIMEOUT }));
        expect(result.current).toBeDefined();
        expect(result.current).toBeInstanceOf(TimedEventManager);
    });
});
