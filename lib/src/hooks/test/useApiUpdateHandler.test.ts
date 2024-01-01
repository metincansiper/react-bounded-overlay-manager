import { renderHook, waitFor } from '@testing-library/react';
import useApiUpdateHandler from '../useApiUpdateHandler';

jest.mock('../../api/BoundedOverlayManagerApi', () => ({
    __esModule: true, // This property is needed for mocking default exports
    default: jest.fn(({ timedEventManager }) => timedEventManager),
}));

describe('useApiUpdateHandler', () => {
  it('should recall onApiUpdated when an api parameter changes', async () => {
    const initialTimedEventManager = { id: 'initial' } as any;
    const onApiUpdated = jest.fn();
    const updateOverlaysContainerBoundingBox = jest.fn();

    const { rerender } = renderHook(({timedEventManager}) => useApiUpdateHandler({ timedEventManager, onApiUpdated, updateOverlaysContainerBoundingBox }), {
        initialProps: { timedEventManager: initialTimedEventManager },
    });

    await waitFor(() => {
        expect(onApiUpdated).toHaveBeenCalledWith(initialTimedEventManager);
    });

    onApiUpdated.mockClear();

    const newTimedEventManager = { id: 'new' } as any;

    rerender({ timedEventManager: newTimedEventManager });

    await waitFor(() => {
        expect(onApiUpdated).toHaveBeenCalledWith(newTimedEventManager);
    });
  });

  it('should not recall onApiUpdated when no api parameter change', async () => {
    const timedEventManager = { id: 'initial' } as any;
    const onApiUpdated = jest.fn();
    const updateOverlaysContainerBoundingBox = jest.fn();

    const { rerender } = renderHook(() => useApiUpdateHandler({ timedEventManager, onApiUpdated, updateOverlaysContainerBoundingBox }));

    await waitFor(() => {
        expect(onApiUpdated).toHaveBeenCalledWith(timedEventManager);
    });

    onApiUpdated.mockClear();

    rerender();

    await waitFor(() => {
        expect(onApiUpdated).not.toHaveBeenCalled();
    });
  });
});
