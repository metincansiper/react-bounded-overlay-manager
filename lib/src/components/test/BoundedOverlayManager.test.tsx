import { render, screen } from '@testing-library/react';
import BoundedOverlayManager from '../BoundedOverlayManager';
import '@testing-library/jest-dom';

jest.mock('../../context/OverlayManagerContext', () => {
    return {
        OverlayManagerContextProvider: ({ children, boundingComponentRef }: any) => {
            boundingComponentRef?.();
            return children
        }
    };
});

jest.mock('../BoundedOverlayManagerContent', () => {
    return {
        __esModule: true,
        default: ({ children }: any) => <div>{children}</div>,
    };
});

describe('BoundedOverlayManager', () => {
    let originalFullscreenElement: any;
    let mockFullscreenElement: any;

    const mockChildTestId = 'mock-test-id';
    const MockChild = () => <div data-testid={mockChildTestId}></div>;
    const queryMockChild = () => screen.queryByTestId(mockChildTestId);

    const enableFullscreen = () => {
        originalFullscreenElement = document.fullscreenElement;

        mockFullscreenElement = document.createElement('div');
        document.body.appendChild(mockFullscreenElement);

        Object.defineProperty(document, 'fullscreenElement', {
            value: mockFullscreenElement,
            writable: true
        });
    };

    const disableFullscreen = () => {
        Object.defineProperty(document, 'fullscreenElement', {
            value: originalFullscreenElement,
            writable: true
        });

        document.body.removeChild(mockFullscreenElement);
    };
    
    const renderComponent = (boundingComponentRef?: any) => {
        boundingComponentRef = boundingComponentRef || jest.fn() as any;

        render(
            <BoundedOverlayManager boundingComponentRef={boundingComponentRef}>
                <MockChild />
            </BoundedOverlayManager>
        );
    }

    it('renders content into the fullscreen element when in fullscreen mode', () => {
        enableFullscreen();

        renderComponent();
        expect(mockFullscreenElement).toContainElement(queryMockChild());

        disableFullscreen();
    });

    it('renders the content into document.body when not in fullscreen mode', () => {
        renderComponent();
        expect(document.body).toContainElement(queryMockChild());
    });

    it('boudingComponentRef is passed to the provider', () => {
        const mockBoundingComponentRef = jest.fn();
        renderComponent(mockBoundingComponentRef);
        expect(mockBoundingComponentRef).toHaveBeenCalled();
    });
});
