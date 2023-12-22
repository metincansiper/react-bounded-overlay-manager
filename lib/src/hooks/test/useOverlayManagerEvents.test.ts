import { renderHook } from '@testing-library/react';
import useOverlayManagerEvents from '../useOverlayManagerEvents';
import TimedEventManager from '../../timer/TimedEventManager';
// import { makeMockComponentRef } from './util';
import { useOverlayManagerContext } from '../../context/OverlayManagerContext';
import { EventEmitter } from 'events';

jest.mock('../../context/OverlayManagerContext');

describe('useOverlayManagerEvents', () => {
    let timedEventManager: TimedEventManager | null;
    let requestStartMock: jest.Mock;
    let requestStopMock: jest.Mock;
    let mockBoundingComponentRef: any;

    const mockOverlayManagerEventEmitter = new EventEmitter();
    const mockOverlayManagerEventEmitterOnSpy = jest.spyOn(mockOverlayManagerEventEmitter, 'on');
    const mockOverlayManagerEventEmitterOffSpy = jest.spyOn(mockOverlayManagerEventEmitter, 'off');

    const assertMountExpects = () => {
        expect(mockOverlayManagerEventEmitterOnSpy).toHaveBeenCalledWith('mousemoveOnOverlay', expect.any(Function));
        expect(mockOverlayManagerEventEmitterOnSpy).toHaveBeenCalledWith('mousemoveOnBoundingComponent', expect.any(Function));
        expect(mockOverlayManagerEventEmitterOnSpy).toHaveBeenCalledWith('mouseleaveOnOverlay', expect.any(Function));
        expect(mockOverlayManagerEventEmitterOnSpy).toHaveBeenCalledWith('mouseleaveOnBoundingComponent', expect.any(Function));
    };

    const assertUnmountExpects = () => {
        expect(mockOverlayManagerEventEmitterOffSpy).toHaveBeenCalledWith('mousemoveOnOverlay', expect.any(Function));
        expect(mockOverlayManagerEventEmitterOffSpy).toHaveBeenCalledWith('mousemoveOnBoundingComponent', expect.any(Function));
        expect(mockOverlayManagerEventEmitterOffSpy).toHaveBeenCalledWith('mouseleaveOnOverlay', expect.any(Function));
        expect(mockOverlayManagerEventEmitterOffSpy).toHaveBeenCalledWith('mouseleaveOnBoundingComponent', expect.any(Function));
    };

    beforeEach(() => {
        mockBoundingComponentRef = {
            current: document.createElement('div'),
        };

        (useOverlayManagerContext as jest.Mock).mockReturnValue({
            overlayManagerEventEmitter: mockOverlayManagerEventEmitter,
            boundingComponentRef: mockBoundingComponentRef,
        });

        timedEventManager = new TimedEventManager({
            onStart: jest.fn(),
            onStop: jest.fn(),
            timeoutDuration: 1000,
        });

        requestStartMock = jest.fn();
        requestStopMock = jest.fn();

        jest.spyOn(timedEventManager, 'requestStart').mockImplementation(requestStartMock);
        jest.spyOn(timedEventManager, 'requestStop').mockImplementation(requestStopMock);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('adds events when mounted', () => {
        renderHook(() => useOverlayManagerEvents({ timedEventManager }));
        assertMountExpects();
    });

    it('removes events when unmounted', () => {
        const { unmount } = renderHook(() => useOverlayManagerEvents({ timedEventManager }));
        unmount();
        assertUnmountExpects();
    });

    it.each([
        {
            eventName: 'mousemoveOnOverlay',
            requestStartOnMouseMove: true,
        },
        {
            eventName: 'mousemoveOnBoundingComponent',
            requestStartOnMouseMove: true,
        },
        {
            eventName: 'mousemoveOnOverlay',
            requestStartOnMouseMove: false,
        },
        {
            eventName: 'mousemoveOnBoundingComponent',
            requestStartOnMouseMove: false,
        },
    ])('calls requestStart when $eventName is emitted and requestStartOnMouseMove is $requestStartOnMouseMove', ({ eventName, requestStartOnMouseMove }) => {
        renderHook(() => useOverlayManagerEvents({ timedEventManager, requestStartOnMouseMove }));
        // const event = new MouseEvent(eventName);
        mockOverlayManagerEventEmitter.emit(eventName);

        expect(requestStartMock).toHaveBeenCalledTimes(requestStartOnMouseMove ? 1 : 0);
    });

    it.each([
        {
            eventName: 'mouseleaveOnBoundingComponent',
            requestStopOnMouseMove: true,
        },
        {
            eventName: 'mouseleaveOnOverlay',
            requestStopOnMouseMove: false,
        },
        {
            eventName: 'mouseleaveOnBoundingComponent',
            requestStopOnMouseMove: false,
        },
    ])('calls requestStop when $eventName is emitted and requestStopOnMouseMove is $requestStopOnMouseMove', ({ eventName, requestStopOnMouseMove }) => {
        renderHook(() => useOverlayManagerEvents({ timedEventManager, requestStopOnMouseMove }));
        // const event = new MouseEvent(eventName);
        mockOverlayManagerEventEmitter.emit(eventName);

        expect(requestStopMock).toHaveBeenCalledTimes(requestStopOnMouseMove ? 1 : 0);
    });

    it('calls requestStop when mouseleaveOnOverlay is emitted and the relatedTarget is not the boundingComponent or a descendant of it', () => {
        renderHook(() => useOverlayManagerEvents({ timedEventManager }));

        const event = new MouseEvent('mouseleaveOnOverlay', {
            relatedTarget: document.createElement('div'),
        });
        
        mockOverlayManagerEventEmitter.emit('mouseleaveOnOverlay', event);

        expect(requestStopMock).toHaveBeenCalled();
    });

    it('does not call requestStop when mouseleaveOnOverlay is emitted but the relatedTarget is the boundingComponent', () => {
        renderHook(() => useOverlayManagerEvents({ timedEventManager }));

        const event = new MouseEvent('mouseleaveOnOverlay', {
            relatedTarget: mockBoundingComponentRef.current,
        });
        
        mockOverlayManagerEventEmitter.emit('mouseleaveOnOverlay', event);

        expect(requestStopMock).not.toHaveBeenCalled();
    });

    it('does not call requestStop when mouseleaveOnOverlay is emitted but the relatedTarget is a descendant of the boundingComponent', () => {
        renderHook(() => useOverlayManagerEvents({ timedEventManager }));

        const childElement = mockBoundingComponentRef.current.appendChild(document.createElement('div'));
        const grandchildElement = childElement.appendChild(document.createElement('div'));

        const event = new MouseEvent('mouseleaveOnOverlay', {
            relatedTarget: grandchildElement,
        });
        
        mockOverlayManagerEventEmitter.emit('mouseleaveOnOverlay', event);

        expect(requestStopMock).not.toHaveBeenCalled();
    });

    it('does not register events when timedEventManager is null', () => {
        renderHook(() => useOverlayManagerEvents({ timedEventManager: null }));
        expect(mockOverlayManagerEventEmitterOnSpy).not.toHaveBeenCalled();
    });
});