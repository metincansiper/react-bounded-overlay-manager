export declare const makeEventOnlyMockComponentRef: () => {
    current: {
        addEventListener: jest.Mock<any, any, any>;
        removeEventListener: jest.Mock<any, any, any>;
        dispatchEvent: jest.Mock<any, any, any>;
    };
};
