import React from 'react';
import styled from 'styled-components';

type Props = {
  onCloseClick: (...args: any[]) => void
}
const ModalWrapper = styled.div`
  width: 100vw;
  position: fixed;
  height: 100vw;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1;
  display: flex;
  justify-content: center;
`
const ModalChildWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 100%;
`
export const Modal: React.FC<Props> = ({ children, onCloseClick }) => {
  return (
    <ModalWrapper onClick={onCloseClick}>
      <ModalChildWrapper>
        <div onClick={e => e.stopPropagation()}>{children}</div>
      </ModalChildWrapper>
    </ModalWrapper>
  )
}
