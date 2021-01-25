import React from "react"
import { useSelector } from "react-redux"
import styled from "styled-components"

import { selectUserInfo } from "../../state/selectors/userData.selector"

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
`
const CenteredContent = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row;
`
const StyledImg = styled.img`
  max-height: 100px;
`

const LeftContent = styled.div`
  display: flex;
  justify-content: start;
  flex-direction: row;
`

const StyledP = styled.p`
  text-align: justify;
  text-justify: inter-word;
`
export const AuthorInfo = () => {
  const authorImageUrl = useSelector(selectUserInfo)?.authorImageUrl
  const authorDescription = useSelector(selectUserInfo)?.authorDescription
  return (
    <Wrapper>
      <CenteredContent>
        <StyledImg src={authorImageUrl} />
      </CenteredContent>
      <LeftContent>
        <StyledP>{authorDescription}</StyledP>
      </LeftContent>
    </Wrapper>
  )
}
