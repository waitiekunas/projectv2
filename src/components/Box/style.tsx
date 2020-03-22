import styled, { css } from 'styled-components';
import { Directions, Props as BoxProps } from './Box';

const generateSpacing = (key: Directions, type: string) => css`
 ${Array.isArray(key.all)
        ? responsive(key.all, type)
        : css`
    ${type}:${key.all};
    `}
 ${Array.isArray(key.top)
        ? responsive(key.top, type + '-top')
        : css`
    ${type}-top:${key.top};
    `}
 ${Array.isArray(key.bottom)
        ? responsive(key.bottom, type + 'bottom')
        : css`
    ${type}-bottom:${key.bottom};
    `}
 ${Array.isArray(key.left)
        ? responsive(key.left, type + 'left')
        : css`
    ${type}-left:${key.left};
    `}
 ${Array.isArray(key.right)
        ? responsive(key.right, type + '-right')
        : css`
    ${type}-right:${key.right};
    `}
`;
const spacingStyle = ({ margin, padding }: BoxProps) => css`
    ${margin &&
    generateSpacing(margin, 'margin')
    }   
    ${padding &&
    generateSpacing(padding, 'padding')
    }
`;

const JUSTIFY_MAP = {
    around: 'space-around',
    between: 'space-between',
    center: 'center',
    end: 'flex-end',
    start: 'flex-start'
}

const flexStyle = ({ flex }: BoxProps) =>
    flex &&
    css`
    display: flex;
    ${Array.isArray(flex.direction)
            ? responsive(flex.direction, 'flex-direction')
            : css`
        flex-direction: ${flex.direction};
        `}
    ${Array.isArray(flex.justify)
            ? responsive(flex.justify.map(x => JUSTIFY_MAP[x]), 'justify-content')
            : css`
        justify-content: ${JUSTIFY_MAP[flex.justify]};
        `}
`;

const sizeStyle = ({ size }: BoxProps) =>
    size &&
    css`
    ${Array.isArray(size.width)
            ? responsive(size.width, 'width')
            : css`
        width: ${size.width};
        `}
     ${Array.isArray(size.height)
            ? responsive(size.height, 'height')
            : css`
        height: ${size.height};
        `}
     ${Array.isArray(size.maxWidth)
            ? responsive(size.maxWidth, 'max-width')
            : css`
        max-width: ${size.maxWidth};
        `}
     ${Array.isArray(size.maxHeight)
            ? responsive(size.maxHeight, 'max-height')
            : css`
        max-height: ${size.maxHeight};
        `}         
 `;
const responsive = (array: Array<string>, value: string) =>
    css`
    @media(min-width:1025px){
        ${value}: ${array[2]}
       }
    @media(max-width:1024px){
        ${value}: ${array[1]}
       }
    @media (max-width:480px){
        ${value}: ${array[0]}
       }
        `

export const StyledBox = styled.div`
    ${(props: BoxProps) => (props.margin || props.padding) && spacingStyle(props)}
    ${(props: BoxProps) => props.flex && flexStyle(props)}    
    ${(props: BoxProps) => props.size && sizeStyle(props)}
    `