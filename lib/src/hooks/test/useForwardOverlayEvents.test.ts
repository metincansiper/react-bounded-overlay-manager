import { renderHook, waitFor } from "@testing-library/react";
import { useOverlayManagerContext } from "../../context/OverlayManagerContext";
import useForwardOverlayEvents from "../useForwardOverlayEvents";
import { makeEventOnlyMockComponentRef } from "./util";

jest.mock('../../context/OverlayManagerContext');

const assertMountExpects = (overlayRef: any) => {
    expect(overlayRef.current.addEventListener).toHaveBeenCalledWith('mousemove', expect.any(Function));
    expect(overlayRef.current.addEventListener).toHaveBeenCalledWith('mouseleave', expect.any(Function));
};

const assertUnmountExpects = (overlayRef: any) => {
    expect(overlayRef.current.removeEventListener).toHaveBeenCalledWith('mousemove', expect.any(Function));
    expect(overlayRef.current.removeEventListener).toHaveBeenCalledWith('mouseleave', expect.any(Function));
}

describe('useForwardOverlayEvents', () => {
    const mockOverlayManagerEventEmitter = {
        emit: jest.fn(),
    };

    const mockOverlayRef = makeEventOnlyMockComponentRef();

    beforeEach(() => {
        (useOverlayManagerContext as jest.Mock).mockReturnValue({
            overlayManagerEventEmitter: mockOverlayManagerEventEmitter,
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('sets up and tears down event listeners', () => {
        const { unmount } = renderHook(() => useForwardOverlayEvents({ overlayRef: mockOverlayRef as any }));

        assertMountExpects(mockOverlayRef);

        unmount();

        assertUnmountExpects(mockOverlayRef);
    });

    it('emits mousemoveOnOverlay when mousemove event occurs', () => {
        renderHook(() => useForwardOverlayEvents({ overlayRef: mockOverlayRef as any }));

        // Simulate mousemove event
        const mouseMoveEvent = new Event('mousemove');
        mockOverlayRef.current.dispatchEvent(mouseMoveEvent);

        expect(mockOverlayManagerEventEmitter.emit).toHaveBeenCalledWith('mousemoveOnOverlay');
    });

    it('emits mousemoveOnOverlay when mouseleave event occurs', () => {
        renderHook(() => useForwardOverlayEvents({ overlayRef: mockOverlayRef as any }));

        // Simulate mouseleave event
        const mouseLeaveEvent = new Event('mouseleave');
        mockOverlayRef.current.dispatchEvent(mouseLeaveEvent);

        expect(mockOverlayManagerEventEmitter.emit).toHaveBeenCalledWith('mouseleaveOnOverlay', mouseLeaveEvent);
    });

    it('handles updates to overlayRef correctly', async () => {
        const { rerender } = renderHook(({ overlayRef }) => useForwardOverlayEvents({ overlayRef }), {
            initialProps: { overlayRef: mockOverlayRef as any },
        });

        const newMockOverlayRef = makeEventOnlyMockComponentRef();
        rerender({ overlayRef: newMockOverlayRef as any });

        await waitFor(() => {
            assertUnmountExpects(mockOverlayRef);
            assertMountExpects(newMockOverlayRef);
        });
    });

    it('does not emit any mount events when overlay element is null', () => {
        const overlayRef = { current: null };
        renderHook(() => useForwardOverlayEvents({ overlayRef }));

        expect(mockOverlayManagerEventEmitter.emit).not.toHaveBeenCalled();
    });
});