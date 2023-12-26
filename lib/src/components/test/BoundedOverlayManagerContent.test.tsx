// BoundedOverlayManagerContent.test.js
import { render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import BoundedOverlayManagerContent from '../../components/BoundedOverlayManagerContent';
// import Overlay from '../../components/Overlay';
import { useOverlayManagerContext } from '../../context/OverlayManagerContext';
import useTimedEventManager from '../../hooks/useTimedEventManager';
import useForwardBoundingComponentEvents from '../../hooks/useForwardBoundingComponentEvents';
import useOverlayManagerEvents from '../../hooks/useOverlayManagerEvents';
import useWindowResize from '../../hooks/useWindowResize';
import useResizeObserver from '../../hooks/useResizeObserver';
import { makeEventOnlyMockComponentRef } from '../../hooks/test/util';
// import OverlaysContainer from '../OverlaysContainer';
// import useForwardBoundingComponentEvents from '../../hooks/useForwardBoundingComponentEvents';
// import useOverlayManagerEvents from '../../hooks/useOverlayManagerEvents';
// import useResizeObserver from '../../hooks/useResizeObserver';
// import useWindowResize from '../../hooks/useWindowResize';
// import { copyComponentBoundingBox } from '../../util/bbox';
// import OverlaysContainer from '../OverlaysContainer';

jest.mock('@react-hook/debounce', () => ({ useDebouncedCallback: jest.fn() }));

// Mocking necessary hooks and components
jest.mock('../../hooks/useTimedEventManager');
jest.mock('../../hooks/useForwardBoundingComponentEvents');
jest.mock('../../hooks/useOverlayManagerEvents');
jest.mock('../../hooks/useResizeObserver');
jest.mock('../../hooks/useWindowResize');
jest.mock('../../util/bbox', () => ({ copyComponentBoundingBox: jest.fn() }));
jest.mock('../OverlaysContainer', () => {
  return jest.fn(({ children, show }) => <div data-testid="overlays-container" data-show={show}>{children}</div>);
});
jest.mock('../../context/OverlayManagerContext');

describe('BoundedOverlayManagerContent', () => {
    let mockBoundingComponentRef: any;

    beforeEach(() => {
        mockBoundingComponentRef = makeEventOnlyMockComponentRef();
        (useOverlayManagerContext as jest.Mock).mockReturnValue({
            boundingComponentRef: mockBoundingComponentRef
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('calls useTimedEventManager with the correct arguments', () => {
        render(
            <BoundedOverlayManagerContent>
                <div>Mock Children</div>
            </BoundedOverlayManagerContent>
        );

        expect(useTimedEventManager).toHaveBeenCalledWith(expect.objectContaining({
            onStart: expect.any(Function),
            onStop: expect.any(Function),
            timeoutDuration: 2000, 
            returnNull: false 
        }));
    });

    it('calls useForwardBoundingComponentEvents', () => {
        render(
            <BoundedOverlayManagerContent>
                <div>Mock Children</div>
            </BoundedOverlayManagerContent>
        );
        expect(useForwardBoundingComponentEvents).toHaveBeenCalled();
    });

    it.each([
        {
            showOverlaysOnMouseMove: true,
            hideOverlaysOnMouseLeave: false,
            skipAllSystemEvents: false
        },
        {
            showOverlaysOnMouseMove: false,
            hideOverlaysOnMouseLeave: true,
            skipAllSystemEvents: false
        },
        {
            showOverlaysOnMouseMove: true,
            hideOverlaysOnMouseLeave: true,
            skipAllSystemEvents: true
        },
        {
            showOverlaysOnMouseMove: false,
            hideOverlaysOnMouseLeave: false,
            skipAllSystemEvents: true
        },
    ])('calls useOverlayManagerEvents with the correct arguments when showOverlaysOnMouseMove is $showOverlaysOnMouseMove, hideOverlaysOnMouseLeave is $hideOverlaysOnMouseLeave and skipAllSystemEvents is $skipAllSystemEvents', ({ showOverlaysOnMouseMove, hideOverlaysOnMouseLeave, skipAllSystemEvents }) => {
        const effectiveShowOverlaysOnMouseMove = showOverlaysOnMouseMove && !skipAllSystemEvents;
        const effectiveHideOverlaysOnMouseLeave = hideOverlaysOnMouseLeave && !skipAllSystemEvents;
        
        render(
            <BoundedOverlayManagerContent showOverlaysOnMouseMove={showOverlaysOnMouseMove} hideOverlaysOnMouseLeave={hideOverlaysOnMouseLeave} skipAllSystemEvents={skipAllSystemEvents}>
                <div>Mock Children</div>
            </BoundedOverlayManagerContent>
        );

        expect(useOverlayManagerEvents).toHaveBeenCalledWith(expect.objectContaining({
            requestStartOnMouseMove: effectiveShowOverlaysOnMouseMove, 
            requestStopOnMouseMove: effectiveHideOverlaysOnMouseLeave 
        }));
    });

    it('calls useWindowResize with the correct arguments', () => {
        render(
            <BoundedOverlayManagerContent>
                <div>Mock Children</div>
            </BoundedOverlayManagerContent>
        );
        expect(useWindowResize).toHaveBeenCalledWith(expect.objectContaining({
            handleResize: expect.any(Function)
        }));
    });

    it('calls useResizeObserver with the correct arguments', () => {
        render(
            <BoundedOverlayManagerContent>
                <div>Mock Children</div>
            </BoundedOverlayManagerContent>
        );
        expect(useResizeObserver).toHaveBeenCalledWith(mockBoundingComponentRef, expect.objectContaining({
            handleResize: expect.any(Function)
        }));
    });

    it('renders OverlaysContainer with the correct props and children', () => {
        const { getByTestId, rerender } = render(
            <BoundedOverlayManagerContent persistentlyShowOverlays={true}>
                <div>Test Overlay</div>
            </BoundedOverlayManagerContent>
        );

        const overlaysContainer = getByTestId('overlays-container');
        expect(overlaysContainer).toHaveAttribute('data-show', 'true');
        expect(overlaysContainer).toHaveTextContent('Test Overlay');

        rerender(
            <BoundedOverlayManagerContent persistentlyShowOverlays={false}>
                <div>Test Overlay</div>
            </BoundedOverlayManagerContent>
        );

        expect(overlaysContainer).toHaveAttribute('data-show', 'false');
    });

    it('overlays container has the show prop set to true when mouse move event is triggered on the bounding component and false when mouse leave event is triggered on it', () => {
        const { getByTestId } = render(
            <BoundedOverlayManagerContent showOverlaysOnMouseMove={true} hideOverlaysOnMouseLeave={true} persistentlyShowOverlays={false}>
                <div>Test Overlay</div>
            </BoundedOverlayManagerContent>
        );

        const overlaysContainer = getByTestId('overlays-container');
        expect(overlaysContainer).toHaveAttribute('data-show', 'false');

        mockBoundingComponentRef.current.dispatchEvent(new MouseEvent('mousemove'));

        waitFor(() => {
            expect(overlaysContainer).toHaveAttribute('data-show', 'true');
        });

        mockBoundingComponentRef.current.dispatchEvent(new MouseEvent('mouseleave'));

        waitFor(() => {
            expect(overlaysContainer).toHaveAttribute('data-show', 'false');
        });
    });
});

