import { renderHook, waitFor } from "@testing-library/react";
import useResizeObserver from "../useResizeObserver";
// import { makeEventOnlyMockComponentRef } from "./util";
// import { act } from "react-dom/test-utils";

jest.mock('@react-hook/debounce', () => ({
    useDebounceCallback: jest.fn((fn) => fn),
}));

describe('useResizeObserver', () => {
    let observeSpy: jest.SpyInstance;
    let disconnectSpy: jest.SpyInstance;

    beforeEach(() => {
        observeSpy = jest.fn();
        disconnectSpy = jest.fn();
        
        global.ResizeObserver = jest.fn().mockImplementation(() => ({
            observe: observeSpy,
            disconnect: disconnectSpy,
        }));
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    const assertMountExpects = (targetElement: any) => {
        expect(observeSpy).toHaveBeenCalledWith(targetElement.current);
    };

    const assertUnmountExpects = () => {
        expect(disconnectSpy).toHaveBeenCalled();
    }

    it('observes the target element', () => {
        const targetElement = { current: {} } as any;
        renderHook(() => useResizeObserver(targetElement, { handleResize: jest.fn() }));

        assertMountExpects(targetElement);
    });

    it('disconnects the observer when unmounted', () => {
        const targetElement = { current: {} } as any;
        const { unmount } = renderHook(() => useResizeObserver(targetElement, { handleResize: jest.fn() }));

        unmount();

        assertUnmountExpects();
    });

    it('does not update the observer when dependecies does not change', async () => {
        const targetElement = { current: {} } as any;
        const handleResize = () => {};
        const { rerender } = renderHook(() => useResizeObserver(targetElement, { handleResize }));

        observeSpy.mockClear();

        rerender();

        await waitFor(() => {
            expect(observeSpy).not.toHaveBeenCalled();
            expect(disconnectSpy).not.toHaveBeenCalled();
        });
    });
    
    // TODO: fix this test
    // it('calls handleResize when a resize event occurs', async () => {
    //     const targetElementRef = makeEventOnlyMockComponentRef() as any;
    //     const handleResize = jest.fn();
    //     renderHook(() => useResizeObserver(targetElementRef, { handleResize }));

    //     await act(() => {
    //         const resizeEvent = new Event('resize');
    //         targetElementRef.current.dispatchEvent(resizeEvent);
    //     });

    //     await waitFor(() => {
    //         expect(handleResize).toHaveBeenCalledTimes(1);
    //     });
    // });

    it('updates the observer when targetElement or handleResize changes', async () => {
        const targetElement = { current: {} } as any;
        const handleResize = jest.fn();
        const { rerender } = renderHook(({ targetElement, handleResize }) => useResizeObserver(targetElement, { handleResize }), {
            initialProps: { targetElement, handleResize },
        });

        jest.clearAllMocks();

        const newHandleResize = jest.fn();
        rerender({ targetElement, handleResize: newHandleResize  });

        await waitFor(() => {
            assertMountExpects(targetElement);
            assertUnmountExpects();
        }); 

        jest.clearAllMocks();

        const newTargetElement = { current: {} } as any;
        rerender({ targetElement: newTargetElement, handleResize: newHandleResize });

        await waitFor(() => {
            assertMountExpects(newTargetElement);
            assertUnmountExpects();
        });
    });
});