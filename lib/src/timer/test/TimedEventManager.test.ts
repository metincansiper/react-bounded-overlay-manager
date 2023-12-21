import TimedEventManager, { NO_TIMEOUT } from '../TimedEventManager';

// TODO: should test if clearTimeout and setTimeout are called with the correct arguments
// or is it an implementation detail that should not be tested?

describe('TimedEventManager', () => {
    let onStartMock: jest.Mock;
    let onStopMock: jest.Mock;
    let manager: TimedEventManager;
    const timeoutDuration = 1000;

    const createTimerEventManager = ({ onStart, onStop, timeoutDuration: timeoutDurationOption }: any = {}) => {
        return new TimedEventManager({
            onStart: onStart || onStartMock,
            onStop: onStop || onStopMock,
            timeoutDuration: timeoutDurationOption || timeoutDuration,
        });
    }

    beforeEach(() => {
        onStartMock = jest.fn();
        onStopMock = jest.fn();
        manager = createTimerEventManager();

        jest.useFakeTimers();
        jest.spyOn(global, 'setTimeout');
        jest.spyOn(global, 'clearTimeout');
    });

    afterEach(() => {
        jest.useRealTimers();
        jest.restoreAllMocks();
    });

    it('should call onStart when requestStart is called', () => {
        manager.requestStart();
        expect(onStartMock).toHaveBeenCalled();
    });


    it('should set a timeout and call onStop after the specified duration', () => {
        manager.requestStart();
        expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), timeoutDuration);
        expect(onStartMock).toHaveBeenCalled();

        jest.advanceTimersByTime(timeoutDuration);

        expect(onStopMock).toHaveBeenCalled();
    });


    it('should clear the timeout when requestStop is called', () => {
        manager.requestStart();
        manager.requestStop();

        expect(clearTimeout).toHaveBeenCalledWith(expect.any(Number));
        jest.advanceTimersByTime(timeoutDuration);

        expect(onStopMock).toHaveBeenCalled();
    });


    it('should handle NO_TIMEOUT case correctly', () => {
        manager = createTimerEventManager({ timeoutDuration: NO_TIMEOUT });
        manager.requestStart();

        expect(setTimeout).not.toHaveBeenCalled();
        expect(onStartMock).toHaveBeenCalled();

        manager.requestStop();

        expect(clearTimeout).not.toHaveBeenCalled();
        expect(onStopMock).toHaveBeenCalled();
    });

    it('should handle multiple requestStart calls before timeout clears', () => {
        manager.requestStart();
        jest.advanceTimersByTime(timeoutDuration / 2);
        manager.requestStart(); 
    
        expect(setTimeout).toHaveBeenCalledTimes(2);
        expect(clearTimeout).toHaveBeenCalledTimes(1); 
        expect(onStartMock).toHaveBeenCalledTimes(1);
    
        jest.advanceTimersByTime(timeoutDuration);
        expect(onStopMock).toHaveBeenCalledTimes(1);
    });
    
    it('should not do anything on requestStop call without an active timeout', () => {
        manager.requestStop();
        
        // not sure if this should be tested
        // expect(clearTimeout).not.toHaveBeenCalled(); 
        
        expect(onStopMock).not.toHaveBeenCalled(); 
    });
    
});



