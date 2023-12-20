import TimedEventManager from './TimedEventManager';

describe('TimedEventManager', () => {
   let onStartMock: jest.Mock;
   let onStopMock: jest.Mock;
   let manager: TimedEventManager;


   beforeAll(() => {
       jest.useFakeTimers();
   });


   afterAll(() => {
       jest.useRealTimers();
   });


   beforeEach(() => {
       onStartMock = jest.fn();
       onStopMock = jest.fn();
       manager = new TimedEventManager({
           onStart: onStartMock,
           onStop: onStopMock,
           timeoutDuration: 1000, // 1 second for testing
       });
   });


   it('should call onStart when requestStart is called', () => {
       manager.requestStart();
       expect(onStartMock).toHaveBeenCalled();
   });


//    it('should set a timeout and call onStop after the specified duration', () => {
//        manager.requestStart();
//        expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), 1000);


//        // jest.advanceTimersByTime(1000);
//        jest.runAllTimers(); // Fast-forward time


//        expect(onStopMock).toHaveBeenCalled();
//    });


   // it('should clear the timeout when requestStop is called', () => {
   //     manager.requestStart();
   //     manager.requestStop();


   //     expect(clearTimeout).toHaveBeenCalledWith(expect.any(Number));
   //     expect(onStopMock).toHaveBeenCalled();
   // });


   // it('should handle NO_TIMEOUT case correctly', () => {
   //     manager = new TimedEventManager({
   //         onStart: onStartMock,
   //         onStop: onStopMock,
   //         timeoutDuration: NO_TIMEOUT,
   //     });


   //     manager.requestStart();


   //     expect(setTimeout).not.toHaveBeenCalled();
   //     expect(onStartMock).toHaveBeenCalled();


   //     manager.requestStop();


   //     expect(clearTimeout).not.toHaveBeenCalled();
   //     expect(onStopMock).toHaveBeenCalled();
   // });
});



