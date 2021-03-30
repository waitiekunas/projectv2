import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { Button } from '../../components/Button/Button';
import { setShowCancelSubscriptionAction } from '../../state/actions/actions';
import { cancelSubscriptionAction } from '../../state/actions/apiData.actions';
import { selectStripeSubscriptionId } from '../../state/selectors/userData.selector';

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
  margin: 1rem;
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
const StyledContainer = styled.div`
  display: flex;
  justify-content: space-around;
  @media (max-width: 760px) {
    justify-content: center;
    flex-direction: column;
  }
`
const StyledButtonDiv = styled.div`
  margin: 1rem;
  width: 100%;
`
const StyledP = styled.p`
  text-align: center;
`
const CancelSubscription = () => {
  const dispatch = useDispatch()

  const stripeSubscriptionId = useSelector(selectStripeSubscriptionId)
  const handleParentClick = e => {
    e.preventDefault()
    dispatch(setShowCancelSubscriptionAction(false))
  }
  const handleChildClick = e => {
    e.stopPropagation()
  }
  const handleClick = evt => {
    evt.preventDefault()
    dispatch(
      cancelSubscriptionAction({
        subscriptionId: stripeSubscriptionId,
      })
    )
    dispatch(setShowCancelSubscriptionAction(false))
  }

  return (
    <Wrapper onClick={handleParentClick}>
      <Container>
        <StyledDiv onClick={handleChildClick}>
          <StyledP>Do you want to cancel your subscription?</StyledP>
          <StyledContainer>
            <StyledButtonDiv>
              <Button
                color="primary"
                variant="contained"
                handleClick={() =>
                  dispatch(setShowCancelSubscriptionAction(false))
                }
                label="No"
              />
            </StyledButtonDiv>
            <StyledButtonDiv>
              <Button
                color="primary"
                variant="contained"
                handleClick={handleClick}
                label="Yes"
              />
            </StyledButtonDiv>
          </StyledContainer>
        </StyledDiv>
      </Container>
    </Wrapper>
  )
}

export default CancelSubscription
