import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { DEFAULT_BUTTON_CLASSES } from '../../Constants/Constants';
import { StyledLabel } from './style';

const Wrapper = styled.div`
  width:100%;
  padding-bottom:8px;
  display:flex;
  flex-direction: column;
`
const Content=styled.div`
  width:100%;
  display:flex;
  padding-bottom:8px;
  justify-content:center;
  @media(max-width:480px){
    justify-content:start;
  }
`
const StyledDiv=styled.div`
  width:50%;
`

type MyProps = {
  onChange: (e: any) => void
  label: string
  value: any[]
  onDelete: (index: number) => void
  errorMessage?: string
}

const FileInput = ({ value, onChange, errorMessage, ...rest }: MyProps) => {
  const [val, setVal] = useState<File[]>(value)
  const [errorMsg, setErrorMessage] = useState(errorMessage)
  useEffect(() => {
    setVal(value)
    setErrorMessage(errorMessage)
  }, [value, errorMessage])
  useEffect(() => {
    setVal(value)
  }, [])

  return (
    <Wrapper>
      <Content>
        <StyledDiv>
          <StyledLabel className={DEFAULT_BUTTON_CLASSES}>
            {rest.label}
            <input
              {...rest}
              style={{ display: "none" }}
              type="file"
              onChange={e => {
                if (e.target.files.length > 0) {
                  onChange([...e.target.files])
                }
              }}
            />
          </StyledLabel>
        </StyledDiv>
      </Content>
      <span>{errorMsg}</span>
    </Wrapper>
  )
}

export default FileInput
