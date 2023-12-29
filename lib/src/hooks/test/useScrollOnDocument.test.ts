import { renderHook, waitFor } from "@testing-library/react";
import useScrollOnDocument from "../useScrollOnDocument";

jest.mock('use-debounce', () => ({
    useDebouncedCallback: jest.fn((fn) => fn),
}));

describe('useScrollOnDocument', () => {
    const handleScrollMock = jest.fn();
    let addEventListenerSpy: jest.SpyInstance;
    let removeEventListenerSpy: jest.SpyInstance;

    const assertMountExpects = (handleScrollMock: any) => {
        expect(addEventListenerSpy).toHaveBeenCalledWith('scroll', handleScrollMock);
    }
    
    const assertUnmountExpects = (handleScrollMock: any) => {
        expect(removeEventListenerSpy).toHaveBeenCalledWith('scroll', handleScrollMock);
    }

    beforeEach(() => {
        addEventListenerSpy = jest.spyOn(document, 'addEventListener');
        removeEventListenerSpy = jest.spyOn(document, 'removeEventListener');
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('adds a debounced scroll event listener', () => {
        renderHook(() => useScrollOnDocument({ handleScroll: handleScrollMock }));
        
        assertMountExpects(handleScrollMock);
    });

    it('removes the scroll event listener when unmounted', () => {
        const { unmount } = renderHook(() => useScrollOnDocument({ handleScroll: handleScrollMock }));
        
        unmount();
        
        assertUnmountExpects(handleScrollMock);
    });

    it('dees not update the scroll event listener when handleScroll does not change', async () => {
        const { rerender } = renderHook(() => useScrollOnDocument({ handleScroll: handleScrollMock }));

        addEventListenerSpy.mockClear();
        rerender();

        await waitFor(() => {
            expect(addEventListenerSpy).not.toHaveBeenCalled();
            expect(removeEventListenerSpy).not.toHaveBeenCalled();
        });
    });

    it('updates the scroll event listener when handleScroll changes', async () => {
        const { rerender } = renderHook(({ handleScroll }) => useScrollOnDocument({ handleScroll }), {
            initialProps: { handleScroll: handleScrollMock },
        });

        const newHandleScrollMock = jest.fn();

        rerender({ handleScroll: newHandleScrollMock });
        
        await waitFor(() => {
            assertUnmountExpects(handleScrollMock);
            assertMountExpects(newHandleScrollMock);
        });
    });

    it('calls handleScroll on scroll on document', () => {
        renderHook(() => useScrollOnDocument({ handleScroll: handleScrollMock }));

        document.dispatchEvent(new Event('scroll'));
    
        expect(handleScrollMock).toHaveBeenCalled();
    });
    
});