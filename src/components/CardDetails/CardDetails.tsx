import React from 'react';
import styled from 'styled-components';

type Props = {
  onCloseClick: (...args: any[]) => void
}
const ModalWrapper = styled.div`
  width: 100vw;
  position: fixed;
  height: 100%;
  top: 0;
  bottom: 0;
  position: fixed;
  overflow-y: scroll;
  overflow-x: hidden;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1;
  display: flex;
  justify-content: center;
`
const ModalChildWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`
export const CardDetails: React.FC<Props> = ({ children, onCloseClick }) => {
  return (
    <ModalWrapper onClick={onCloseClick}>
      <ModalChildWrapper>
        <ModalChildWrapper onClick={e => e.stopPropagation()}>
          {children}
        </ModalChildWrapper>
      </ModalChildWrapper>
    </ModalWrapper>
  )
}
