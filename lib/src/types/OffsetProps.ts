export type OffsetProps = {
    top?: number,
    left?: number,
    right?: number,
    bottom?: number,
};

export type TopLeftOffsetProps = {
    top?: number,
    left?: number,
};

export type TopRightOffsetProps = {
    top?: number,
    right?: number,
};

export type BottomLeftOffsetProps = {
    bottom?: number,
    left?: number,
};

export type BottomRightOffsetProps = {
    bottom?: number,
    right?: number,
};

export type TopCenterOffsetProps = TopLeftOffsetProps;
export type BottomCenterOffsetProps = BottomLeftOffsetProps;
export type CenterOffsetProps = TopLeftOffsetProps;