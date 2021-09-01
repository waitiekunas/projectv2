import React from "react"
import { useDispatch } from "react-redux"
import styled from "styled-components"

import { Button } from "../../components/Button/Button"
import { Languages } from "../../enums/languages/languages"
import { setResponseMessageAction } from "../../state/actions/actions"

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  position: fixed;
  z-index: 10;
  width: 100vw;
  height: 120%;
  background-color: rgba(0, 0, 0, 0.5);
  top: 0;
  bottom: 0;
  position: fixed;
  overflow-y: scroll;
  overflow-x: hidden;
`
const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`
const StyledDiv = styled.div`
  width: 50%;
  position: fixed;
  margin-bottom: 1rem;
  padding-bottom: 2rem;
  padding-top: 1.5rem;
  padding-left: 2rem;
  padding-right: 2rem;
  border-radius: 0.25rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  background-color: #fff;
  @media (max-width: 760px) {
    width: 90%;
  }
  top: 25%;
`
const ContentWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
`
const Content = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
`
const TextBox = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row;
`
const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: row;
  padding-top: 1.5rem;
`

const ButtonBox = styled.div`
  width: 25%;
`

interface MyProps {
  text: string
  handleClick: () => void
  language: Languages
}

export const ResponseStatus: React.FC<MyProps> = ({
  text,
  handleClick,
  language,
}) => {
  const dispatch = useDispatch()
  const handleChildClick = e => {
    e.stopPropagation()
  }
  return (
    <Wrapper
      onClick={() =>
        dispatch(setResponseMessageAction({ text: "", show: false }))
      }
    >
      <Container>
        <StyledDiv onClick={handleChildClick}>
          <ContentWrapper>
            <Content>
              <TextBox>
                <p>{text}</p>
              </TextBox>

              <ButtonWrapper>
                <ButtonBox>
                  <Button
                    handleClick={handleClick}
                    label={"close"}
                    language={language}
                    variant="contained"
                    color="primary"
                  />
                </ButtonBox>
              </ButtonWrapper>
            </Content>
          </ContentWrapper>
        </StyledDiv>
      </Container>
    </Wrapper>
  )
}
