import { renderHook, waitFor } from '@testing-library/react';
import useApiUpdateHandler from '../useApiUpdateHandler';

jest.mock('../../api/BoundedOverlayManagerApi', () => ({
    __esModule: true, // This property is needed for mocking default exports
    default: jest.fn(({ timedEventManager }) => timedEventManager),
}));

describe('useApiUpdateHandler', () => {
  it('should recall onApiUpdated when timedEventManager changes', async () => {
    const initialTimedEventManager = { id: 'initial' } as any;
    const onApiUpdated = jest.fn();

    const { rerender } = renderHook(({timedEventManager}) => useApiUpdateHandler({ timedEventManager, onApiUpdated }), {
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

  it('should not recall onApiUpdated when timedEventManager does not change', async () => {
    const timedEventManager = { id: 'initial' } as any;
    const onApiUpdated = jest.fn();

    const { rerender } = renderHook(() => useApiUpdateHandler({ timedEventManager, onApiUpdated }));

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
