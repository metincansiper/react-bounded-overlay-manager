import { renderHook, waitFor } from '@testing-library/react';
import useApiUpdateHandler from '../useApiUpdateHandler';

jest.mock('../../api/BoundedOverlayManagerApi', () => ({
    __esModule: true, // This property is needed for mocking default exports
    default: jest.fn(({ timedEventManager }) => timedEventManager),
}));

describe('useApiUpdateHandler', () => {
  it('should recall onApiUpdated when timedEventManager changes', () => {
    const initialTimedEventManager = { id: 'initial' } as any;
    const onApiUpdated = jest.fn();
    const { rerender } = renderHook(() => useApiUpdateHandler({ timedEventManager: initialTimedEventManager, onApiUpdated }));

    waitFor(() => {
        expect(onApiUpdated).toHaveBeenCalledWith(initialTimedEventManager);
    });

    onApiUpdated.mockClear();

    const newTimedEventManager = { id: 'new' } as any;
    rerender(() => useApiUpdateHandler({ timedEventManager: newTimedEventManager, onApiUpdated }));

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
