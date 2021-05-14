import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { setShowAuthorLessonsAction } from '../../state/actions/actions';
import { getAuthorLessonsAction } from '../../state/actions/apiData.actions';
import { selectUserId } from '../../state/selectors/userData.selector';

const Wrapper = styled.div`
  justify-content: center;
  position: fixed;
  z-index: 10;
  width: 100vw;
  height: 120%;
  background-color: rgba(0, 0, 0, 0.5);
  top: 0%;
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

export const AuthorLessonsList: React.FC = () => {
  const dispatch = useDispatch()
  const userId = useSelector(selectUserId).toString()
  useEffect(() => {
    dispatch(getAuthorLessonsAction({ authorId: userId }))
  }, [])
  const handleParentClick = e => {
    e.preventDefault()
    dispatch(setShowAuthorLessonsAction(false))
  }
  const handleChildClick = e => {
    e.stopPropagation()
  }

  return (
    <Wrapper onClick={handleParentClick}>
      <Container>
        <StyledDiv onClick={handleChildClick}></StyledDiv>
      </Container>
    </Wrapper>
  )
}
