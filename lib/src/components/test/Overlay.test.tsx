import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Overlay, { overlayClassName } from '../Overlay';
import PredefinedPosition from '../../enum/PredefinedPosition';
import { useOverlayManagerContext } from '../../context/OverlayManagerContext';
import useForwardOverlayEvents from '../../hooks/useForwardOverlayEvents';

const mockConvertToPercentReturnValue = 20;

const expectedStyles = [
    {
        positionProps: {
            position: PredefinedPosition.TOP_LEFT,
        },
        expectedStyle: {
            top: 0,
            left: 0,
        },
    },
    {
        positionProps: {
            position: PredefinedPosition.TOP_LEFT,
            offset: { top: '10%', left: '10%' },
        },
        expectedStyle: {
            top: '10%',
            left: '10%',
        },
    },
    {
        positionProps: {
            position: PredefinedPosition.BOTTOM_CENTER,
        },
        expectedStyle: {
            bottom: 0,
            left: '50%',
            transform: 'translateX(-50%)',
        },
    },
    {
        positionProps: {
            position: PredefinedPosition.TOP_RIGHT,
        },
        expectedStyle: {
            top: 0,
            right: 0,
        },
    },
    {
        positionProps: {
            position: PredefinedPosition.TOP_RIGHT,
            offset: { top: '10%', right: '10%' },
        },
        expectedStyle: {
            top: '10%',
            right: '10%',
        },
    },
    {
        positionProps: {
            position: PredefinedPosition.BOTTOM_LEFT,
        },
        expectedStyle: {
            bottom: 0,
            left: 0,
        },
    },
    {
        positionProps: {
            position: PredefinedPosition.BOTTOM_LEFT,
            offset: { bottom: '10%', left: '10%' },
        },
        expectedStyle: {
            bottom: '10%',
            left: '10%',
        },
    },
    {
        positionProps: {
            position: PredefinedPosition.BOTTOM_RIGHT,
        },
        expectedStyle: {
            bottom: 0,
            right: 0,
        },
    },
    {
        positionProps: {
            position: PredefinedPosition.BOTTOM_RIGHT,
            offset: { bottom: '10%', right: '10%' },
        },
        expectedStyle: {
            bottom: '10%',
            right: '10%',
        },
    },
    {
        positionProps: {
            position: PredefinedPosition.TOP_CENTER,
        },
        expectedStyle: {
            top: 0,
            left: '50%',
            transform: 'translateX(-50%)',
        },
    },
    {
        positionProps: {
            position: PredefinedPosition.TOP_CENTER,
            offset: { left: '10%' },
        },
        expectedStyle: {
            top: 0,
            left: `${50 + mockConvertToPercentReturnValue}%`,
            transform: 'translateX(-50%)',
        },
    },
    {
        positionProps: {
            position: PredefinedPosition.BOTTOM_CENTER,
            offset: { left: '10%' },
        },
        expectedStyle: {
            bottom: 0,
            left: `${50 + mockConvertToPercentReturnValue}%`,
            transform: 'translateX(-50%)',
        },
    },
    {
        positionProps: {
            position: PredefinedPosition.CENTER,
        },
        expectedStyle: {
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
        },
    },
    {
        positionProps: {
            position: PredefinedPosition.CENTER,
            offset: { top: '10%', left: '10%' },
        },
        expectedStyle: {
            top: `${50 + mockConvertToPercentReturnValue}%`,
            left: `${50 + mockConvertToPercentReturnValue}%`,
            transform: 'translate(-50%, -50%)',
        },
    },
    {
        positionProps: {
            position: PredefinedPosition.MID_LEFT,
        },
        expectedStyle: {
            top: '50%',
            left: 0,
            transform: 'translateY(-50%)',
        },
    },
    {
        positionProps: {
            position: PredefinedPosition.MID_LEFT,
            offset: { top: '10%', left: '10%' },
        },
        expectedStyle: {
            top: `${50 + mockConvertToPercentReturnValue}%`,
            left: '10%',
            transform: 'translateY(-50%)',
        },
    },
    {
        positionProps: {
            position: PredefinedPosition.MID_RIGHT,
        },
        expectedStyle: {
            top: '50%',
            right: 0,
            transform: 'translateY(-50%)',
        },
    },
    {
        positionProps: {
            position: PredefinedPosition.MID_RIGHT,
            offset: { top: '10%', right: '10%' },
        },
        expectedStyle: {
            top: `${50 + mockConvertToPercentReturnValue}%`,
            right: '10%',
            transform: 'translateY(-50%)',
        },
    },
];

jest.mock('../../context/OverlayManagerContext');

jest.mock('../../hooks/useForwardBoundingComponentEvents');

jest.mock('../../hooks/useResizeObserver');

jest.mock('../../hooks/useForwardOverlayEvents', () => ({
    __esModule: true, // This property is needed for mocking default exports
    default: jest.fn(),
}));

jest.mock('../../util/css', () => ({
    ...jest.requireActual('../../util/css'),
    convertCssUnitToPercent: jest.fn((value: any) => {
        if (!value) {
            return 0;
        }

        return mockConvertToPercentReturnValue;
    }),
}));

describe('Overlay Component', () => {
    const mockBoundingComponentRef = { current: document.createElement('div') };

    beforeEach(() => {
        (useOverlayManagerContext as jest.Mock).mockReturnValue({
            boundingComponentRef: mockBoundingComponentRef,
        });
    });

    it.each(expectedStyles)(`applies correct styles for position $positionProps.position and offset $positionProps.offset`, ({ positionProps, expectedStyle }) => {
        const { getByRole } = render(
            <Overlay {...positionProps}>Test Content</Overlay>
        );

        const overlayElement = getByRole('overlay');
        expect(overlayElement).toHaveStyle(expectedStyle);
    });

    it('useForwardOverlayEvents is called with correct arguments', () => {
        render(
            <Overlay position={PredefinedPosition.TOP_LEFT}>Test Content</Overlay>
        );

        expect(useForwardOverlayEvents).toHaveBeenCalledWith(expect.objectContaining({
            overlayRef: expect.anything(),
        }));
    });

    it('renders children', () => {
        const childTestId = 'child-testid';
        const child = <div data-testid={childTestId}>Test Child</div>;
        const { getByTestId } = render(
            <Overlay position={PredefinedPosition.TOP_LEFT}>{child}</Overlay>
        );

        expect(getByTestId(childTestId)).toBeInTheDocument();
    });

    it('overlay element has the correct class name', () => {
        const { getByRole } = render(
            <Overlay position={PredefinedPosition.TOP_LEFT}>Test Content</Overlay>
        );

        expect(getByRole('overlay')).toHaveClass(overlayClassName);
    });

    it('updates as expected when position prop is updated', () => {
        const { rerender, getByRole } = render(
            <Overlay position={PredefinedPosition.TOP_CENTER}>
                Test Content
            </Overlay>
        );

        let overlayElement = getByRole('overlay');
        expect(overlayElement).toHaveStyle({ top: 0, left: '50%' });

        rerender(
            <Overlay position={PredefinedPosition.CENTER}>
                Test Content
            </Overlay>
        );

        expect(overlayElement).toHaveStyle({ top: '50%', left: '50%' });
    });

    it('updates as expected when offset prop is updated', () => {
        const initialOffset = { top: '10%', left: '10%' };
        const { rerender, getByRole } = render(
            <Overlay position={PredefinedPosition.TOP_LEFT} offset={initialOffset}>
                Test Content
            </Overlay>
        );

        let overlayElement = getByRole('overlay');
        expect(overlayElement).toHaveStyle(initialOffset);
        
        const updatedOffset = { top: '20%', left: '20%' };
        rerender(
            <Overlay position={PredefinedPosition.TOP_LEFT} offset={updatedOffset}>
                Test Content
            </Overlay>
        );

        expect(overlayElement).toHaveStyle(updatedOffset);
    });
});
