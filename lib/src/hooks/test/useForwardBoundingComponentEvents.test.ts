import { renderHook } from '@testing-library/react';
import { useOverlayManagerContext } from '../../context/OverlayManagerContext';
import useForwardBoundingComponentEvents from '../useForwardBoundingComponentEvents';
import { makeEventOnlyMockComponentRef } from './util';

const createOverlayElement = () => {
    const overlayElement = document.createElement('div');
    overlayElement.className = 'overlay';
    return overlayElement;
}

const createElementWithOverlayAncestor = () => {
    const overlayElement = createOverlayElement();
    const childElement = document.createElement('div');
    overlayElement.appendChild(childElement);
    const grandchildElement = document.createElement('div');
    childElement.appendChild(grandchildElement);
    return grandchildElement;
}

const assertMountExpects = (boundingComponentRef: any) => {
    expect(boundingComponentRef.current.addEventListener).toHaveBeenCalledWith('mousemove', expect.any(Function));
    expect(boundingComponentRef.current.addEventListener).toHaveBeenCalledWith('mouseleave', expect.any(Function));
};

const assertUnmountExpects = (boundingComponentRef: any) => {
    expect(boundingComponentRef.current.removeEventListener).toHaveBeenCalledWith('mousemove', expect.any(Function));
    expect(boundingComponentRef.current.removeEventListener).toHaveBeenCalledWith('mouseleave', expect.any(Function));
}

jest.mock('../../context/OverlayManagerContext');

describe('useForwardBoundingComponentEvents', () => {
    const mockOverlayManagerEventEmitter = {
        emit: jest.fn(),
    };

    let mockBoundingComponentRef: any;

    beforeEach(() => {
        mockBoundingComponentRef = makeEventOnlyMockComponentRef();
        (useOverlayManagerContext as jest.Mock).mockReturnValue({
            overlayManagerEventEmitter: mockOverlayManagerEventEmitter,
            boundingComponentRef: mockBoundingComponentRef,
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('sets up and tears down event listeners', () => {
        const { unmount } = renderHook(() => useForwardBoundingComponentEvents());

        assertMountExpects(mockBoundingComponentRef);

        unmount();

        assertUnmountExpects(mockBoundingComponentRef);
    });

    it('emits mousemoveOnBoundingComponent when mousemove event occurs', () => {
        renderHook(() => useForwardBoundingComponentEvents());

        // Simulate mousemove event
        const mouseMoveEvent = new Event('mousemove');
        mockBoundingComponentRef.current.dispatchEvent(mouseMoveEvent);

        expect(mockOverlayManagerEventEmitter.emit).toHaveBeenCalledWith('mousemoveOnBoundingComponent');
    });

    it('emits mouseleaveOnBoundingComponent when mouseleave event occurs', () => {
        renderHook(() => useForwardBoundingComponentEvents());

        // Simulate mouseleave event
        const mouseLeaveEvent = new Event('mouseleave');
        mockBoundingComponentRef.current.dispatchEvent(mouseLeaveEvent);

        expect(mockOverlayManagerEventEmitter.emit).toHaveBeenCalledWith('mouseleaveOnBoundingComponent');
    });

    it.each([
        {
            title: 'does not emit mouseleaveOnBoundingComponent when related target is an overlay',
            relatedTarget: createOverlayElement(),
        },
        {
            title: 'does not emit mouseleaveOnBoundingComponent when related target is a descendant of an overlay',
            relatedTarget: createElementWithOverlayAncestor(),
        },
    ])('$title', ({ relatedTarget }) => {
        renderHook(() => useForwardBoundingComponentEvents());

        const event = new MouseEvent('mouseleave', { relatedTarget });
        mockBoundingComponentRef.current.dispatchEvent(event);

        expect(mockOverlayManagerEventEmitter.emit).not.toHaveBeenCalledWith('mouseleaveOnBoundingComponent');
    });

    it('handles updates to boundingComponentRef correctly', () => {
        const { rerender } = renderHook(() => useForwardBoundingComponentEvents());

        const newMockBoundingComponentRef = makeEventOnlyMockComponentRef();

        // Update the context with the new mockBoundingComponentRef
        // this must clean up the old event listeners and set up new ones
        (useOverlayManagerContext as jest.Mock).mockReturnValue({
            overlayManagerEventEmitter: mockOverlayManagerEventEmitter,
            boundingComponentRef: newMockBoundingComponentRef,
        });

        rerender();

        assertUnmountExpects(mockBoundingComponentRef);
        assertMountExpects(newMockBoundingComponentRef);
    });
});
