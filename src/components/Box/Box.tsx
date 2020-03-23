import React from 'react';
import { StyledBox } from './style';

export type Directions = {
    all?: string | Array<string>;
    top?: string | Array<string>;
    left?: string | Array<string>;
    right?: string | Array<string>;
    bottom?: string | Array<string>;
}

export type Props = {
    flex?: {
        direction?:
        | 'column'
        | 'row'
        | Array<string>;
        justify?:
        | 'around'
        | 'between'
        | 'center'
        | 'end'
        | 'start'
        | Array<string>;
    };
    margin?: Directions;
    padding?: Directions;
    size?: {
        width?: string | Array<string>;
        height?: string | Array<string>;
        maxWidth?: string | Array<string>;
        maxHeight?: string | Array<string>;
        minWidth?: string | Array<string>;
        minHeight?: string | Array<string>;
    },
    align?: {
        self?:
        | 'center'
        | 'flex-end'
        | 'flex-start'
    }
    className?: string
}

export const Box: React.FC<Props> = ({ children, className, ...rest }) => {
    return <StyledBox className={className} {...rest}>{children}</StyledBox>
}