import { renderHook, waitFor } from '@testing-library/react';
import useApiRefHandler from '../useApiRefHandler';

jest.mock('../../api/BoundedOverlayManagerApi', () => ({
    __esModule: true, // This property is needed for mocking default exports
    default: jest.fn(({ timedEventManager }) => timedEventManager),
}));

describe('useApiRefHandler', () => {
  it('should create a new apiRef instance when timedEventManager changes', () => {
    const initialTimedEventManager = { id: 'initial' } as any;
    const onApiUpdated = jest.fn();
    const { rerender } = renderHook(() => useApiRefHandler({ timedEventManager: initialTimedEventManager, onApiUpdated }));

    waitFor(() => {
        expect(onApiUpdated).toHaveBeenCalledWith(initialTimedEventManager);
    });

    onApiUpdated.mockClear();

    const newTimedEventManager = { id: 'new' } as any;
    rerender(() => useApiRefHandler({ timedEventManager: newTimedEventManager, onApiUpdated }));

    waitFor(() => {
        expect(onApiUpdated).toHaveBeenCalledWith(newTimedEventManager);
    });
  });

//   it('should create a new apiRef instance when timedEventManager changes', () => {
//     const timedEventManager = { id: 'initial' } as any;
//     const onApiUpdated = jest.fn();
//     const { rerender } = renderHook(() => useApiRefHandler({ timedEventManager, onApiUpdated }));

//     waitFor(() => {
//         expect(onApiUpdated).toHaveBeenCalledWith(timedEventManager);
//     });

//     onApiUpdated.mockClear();

//     rerender(() => useApiRefHandler({ timedEventManager, onApiUpdated }));

//     waitFor(() => {
//         expect(onApiUpdated).not.toHaveBeenCalled();
//     });
//   });
});
