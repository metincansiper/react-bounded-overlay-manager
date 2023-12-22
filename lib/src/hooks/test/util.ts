const EventEmitter = require('eventemitter3');

export const makeEventOnlyMockComponentRef = () => {
    const eventEmitter = new EventEmitter();

    return {
        current: {
            addEventListener: jest.fn().mockImplementation((event, callback) => {
                eventEmitter.on(event, callback);
            }),
            removeEventListener: jest.fn().mockImplementation((event, callback) => {
                eventEmitter.off(event, callback);
            }),
            dispatchEvent: jest.fn().mockImplementation((event: Event) => {
                eventEmitter.emit(event.type, event);
            }),
        },
    };
};