import { renderHook } from '@testing-library/react';
import { useOverlayManagerContext } from '../context/OverlayManagerContext';
import useForwardBoundingComponentEvents from './useForwardBoundingComponentEvents';
const EventEmitter = require('eventemitter3'); // TODO: import did not work for some reason

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

// Mock the context
jest.mock('../context/OverlayManagerContext');

describe('useForwardBoundingComponentEvents', () => {
    // Mock dependencies
    const mockOverlayManagerEventEmitter = {
        emit: jest.fn(),
    };


    const makeMockBoundingComponentRef = () => {
        const eventEmitter = new EventEmitter();

        const mockBoundingComponentRef = {
            current: {
                addEventListener: jest.fn().mockImplementation((event, callback) => {
                    eventEmitter.on(event, callback);
                }),
                removeEventListener: jest.fn().mockImplementation((event, callback) => {
                    eventEmitter.off(event, callback);
                }),
                dispatchEvent: jest.fn().mockImplementation((event: Event) => {
                    eventEmitter.emit(event.type, event);
                }),
            },
        };

        return mockBoundingComponentRef;
    };

    let mockBoundingComponentRef: any;

    // Setup mock context before each test
    beforeEach(() => {
        mockBoundingComponentRef = makeMockBoundingComponentRef();
        (useOverlayManagerContext as jest.Mock).mockReturnValue({
            overlayManagerEventEmitter: mockOverlayManagerEventEmitter,
            boundingComponentRef: mockBoundingComponentRef,
        });
    });

    // Clear all mocks after each test
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('sets up and tears down event listeners', () => {
        const { unmount } = renderHook(() => useForwardBoundingComponentEvents());

        expect(mockBoundingComponentRef.current.addEventListener).toHaveBeenCalledWith('mousemove', expect.any(Function));
        expect(mockBoundingComponentRef.current.addEventListener).toHaveBeenCalledWith('mouseleave', expect.any(Function));

        unmount();

        expect(mockBoundingComponentRef.current.removeEventListener).toHaveBeenCalledWith('mousemove', expect.any(Function));
        expect(mockBoundingComponentRef.current.removeEventListener).toHaveBeenCalledWith('mouseleave', expect.any(Function));
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
});
