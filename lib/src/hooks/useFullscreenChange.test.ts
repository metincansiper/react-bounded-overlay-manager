import { renderHook, waitFor } from '@testing-library/react';
import useFullscreenChange from './useFullscreenChange';

describe('useFullscreenChange', () => {
    const handleFullscreenChange = jest.fn();
    const events = ["fullscreenchange", "webkitfullscreenchange", "mozfullscreenchange", "MSFullscreenChange"];

    const assertUnmountExpects = (removeEventListenerSpy: jest.SpyInstance, callback: any) => {
        events.forEach(event => {
            expect(removeEventListenerSpy).toHaveBeenCalledWith(event, callback);
        });
    };

    const assertMountExpects = (addEventListenerSpy: jest.SpyInstance, callback: any) => {
        events.forEach(event => {
            expect(addEventListenerSpy).toHaveBeenCalledWith(event, callback);
        });
    };

    afterEach(() => {
        jest.clearAllMocks();
        jest.restoreAllMocks();
    });

    it('adds fullscreen change event listeners when mounted', () => {
        const addEventListenerSpy = jest.spyOn(document, 'addEventListener');
        renderHook(() => useFullscreenChange({ handleFullscreenChange }));

        assertMountExpects(addEventListenerSpy, handleFullscreenChange);
    });

    it('removes fullscreen change event listeners when unmounted', () => {
        const removeEventListenerSpy = jest.spyOn(document, 'removeEventListener');
        const { unmount } = renderHook(() => useFullscreenChange({ handleFullscreenChange }));

        unmount();

        assertUnmountExpects(removeEventListenerSpy, handleFullscreenChange);
    });

    it('calls handleFullscreenChange when a fullscreen change event occurs', () => {
        renderHook(() => useFullscreenChange({ handleFullscreenChange }));

        // Simulate each fullscreen change event
        events.forEach(event => {
            document.dispatchEvent(new Event(event));
            expect(handleFullscreenChange).toHaveBeenCalledTimes(1);
            handleFullscreenChange.mockClear();
        });
    });

    it('updates event listeners when handleFullscreenChange changes', async () => {
        const newHandleFullscreenChange = jest.fn();
        const addEventListenerSpy = jest.spyOn(document, 'addEventListener');
        const removeEventListenerSpy = jest.spyOn(document, 'removeEventListener');
    
        const { rerender } = renderHook(() => useFullscreenChange({ handleFullscreenChange }));
        
        // Clear all mock calls after initial render
        addEventListenerSpy.mockClear();
        removeEventListenerSpy.mockClear();
        handleFullscreenChange.mockClear();
    
        // Rerender the hook with the new handleFullscreenChange function
        rerender(() => useFullscreenChange({ handleFullscreenChange: newHandleFullscreenChange }));
        
        waitFor(() => {
            assertMountExpects(addEventListenerSpy, newHandleFullscreenChange);
            assertUnmountExpects(removeEventListenerSpy, handleFullscreenChange);
        });
    });
    
});
