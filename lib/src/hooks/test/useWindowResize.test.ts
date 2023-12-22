import { renderHook, waitFor } from "@testing-library/react";
import useWindowResize from "../useWindowResize";

jest.mock('@react-hook/debounce', () => ({
    useDebounceCallback: jest.fn((fn) => fn),
}));

describe('useWindowResize', () => {
    const handleResizeMock = jest.fn();
    let addEventListenerSpy: jest.SpyInstance;
    let removeEventListenerSpy: jest.SpyInstance;

    const assertMountExpects = (handleResizeMock: any) => {
        expect(addEventListenerSpy).toHaveBeenCalledWith('resize', handleResizeMock);
    }
    
    const assertUnmountExpects = (handleResizeMock: any) => {
        expect(removeEventListenerSpy).toHaveBeenCalledWith('resize', handleResizeMock);
    }

    beforeEach(() => {
        addEventListenerSpy = jest.spyOn(window, 'addEventListener');
        removeEventListenerSpy = jest.spyOn(window, 'removeEventListener');
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('adds a debounced resize event listener', () => {
        renderHook(() => useWindowResize({ handleResize: handleResizeMock }));
        
        assertMountExpects(handleResizeMock);
    });

    it('removes the resize event listener when unmounted', () => {
        const { unmount } = renderHook(() => useWindowResize({ handleResize: handleResizeMock }));
        
        unmount();
        
        assertUnmountExpects(handleResizeMock);
    });

    it('dees not update the resize event listener when handleResize does not change', () => {
        const { rerender } = renderHook(() => useWindowResize({ handleResize: handleResizeMock }));

        addEventListenerSpy.mockClear();
        rerender(() => useWindowResize({ handleResize: handleResizeMock }));

        expect(addEventListenerSpy).not.toHaveBeenCalled();
        expect(removeEventListenerSpy).not.toHaveBeenCalled();
    });

    it('updates the resize event listener when handleResize changes', () => {
        const { rerender } = renderHook(() => useWindowResize({ handleResize: handleResizeMock }));
        const newHandleResizeMock = jest.fn();

        rerender(() => useWindowResize({ handleResize: newHandleResizeMock }));
        
        waitFor(() => {
            assertUnmountExpects(handleResizeMock);
            assertMountExpects(newHandleResizeMock);
        });
    });

    it('calls handleResize on window resize', () => {
        renderHook(() => useWindowResize({ handleResize: handleResizeMock }));
    
        window.dispatchEvent(new Event('resize'));
    
        expect(handleResizeMock).toHaveBeenCalled();
    });
    
});