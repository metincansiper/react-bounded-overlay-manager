import { CSSProperties } from "react";

export type TopLeftOffsetProps = {
    top?: CSSProperties['top'],
    left?: CSSProperties['left'],
};

export type TopRightOffsetProps = {
    top?: CSSProperties['top'],
    right?: CSSProperties['right'],
};

export type BottomLeftOffsetProps = {
    bottom?: CSSProperties['bottom'],
    left?: CSSProperties['left'],
};

export type BottomRightOffsetProps = {
    bottom?: CSSProperties['bottom'],
    right?: CSSProperties['right'],
};

export type TopCenterOffsetProps = {
    top?: CSSProperties['top'],
};

export type BottomCenterOffsetProps = {
    bottom?: CSSProperties['bottom'],
};

export type MidLeftOffsetProps = {
    left?: CSSProperties['left'],
};

export type MidRightOffsetProps = {
    right?: CSSProperties['right'],
};