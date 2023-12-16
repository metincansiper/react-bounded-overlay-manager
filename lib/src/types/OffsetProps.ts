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
    leftPercent?: number,
};

export type BottomCenterOffsetProps = {
    bottom?: CSSProperties['bottom'],
    leftPercent?: number,
};

export type MidLeftOffsetProps = {
    left?: CSSProperties['left'],
    topPercent?: number,
};

export type MidRightOffsetProps = {
    right?: CSSProperties['right'],
    topPercent?: number,
};

export type CenterOffsetProps = {
    topPercent?: number,
    leftPercent?: number,
};