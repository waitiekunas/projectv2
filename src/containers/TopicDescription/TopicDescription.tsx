import React, { useCallback, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import styled from "styled-components"

import { Button } from "../../components/Button/Button"
import { Image } from "../../components/Image/Image"
import {
  getAuthorInfoAction,
  registerViewAction,
} from "../../state/actions/apiData.actions"
import { selectAuthorInfo } from "../../state/selectors/apiData.selector"
import {
  selectLanguage,
  selectUserId,
  selectUserInfo,
} from "../../state/selectors/userData.selector"
import CreateCustomerForm from "../CreateCustomerForm/CreateCustomerForm"
import LessonFlow from "../LessonFlow/LessonFlow"

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`
const ContentArea = styled.div`
  width: 80%;
`
const TextArea = styled.p`
  text-align: justify;
  padding: 1rem;
`

const AuthorInfoArea = styled.div`
  display: flex;
  padding: 1rem;
  @media (max-width: 767px) {
    flex-direction: column;
    justify-content: center;
  }
`
const AuthorPhotoArea = styled.div`
  width: 25%;
  padding: 1rem;
  @media (max-width: 767px) {
    width: 50%;
    align-self: center;
  }
`
const AuthorDescriptionArea = styled.div`
  width: 70%;
  padding: 1rem;
  @media (max-width: 767px) {
    width: auto;
    padding: 1rem;
  }
`
const ButtonsWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
`

const ButtonWrapper = styled.div`
  max-width: 200px;
  width: 25%;
  height: 42px;
  align-self: center;
  margin-top: 0.5rem;
`
type MyProps = {
  topicInfo: {
    id: number
    authorDesc: {
      photo: string
      description: string
    }
    description: string
    authorId: number
  }
}

const TopicDescription = (props: MyProps) => {
  const dispatch = useDispatch()
  const language = useSelector(selectLanguage)
  const userInfo = useSelector(selectUserInfo)
  const [clicked, setClicked] = useState(false)
  const [selectedClassId, setSelectedClassId] = useState(0)
  const authorInfo = useSelector(selectAuthorInfo)
  const userId = useSelector(selectUserId)
  useEffect(() => {
    let author = new FormData()
    author.append("id", props.topicInfo.authorId.toString())
    dispatch(getAuthorInfoAction(author))
  }, [])
  const handleClick = e => {
    e.preventDefault()
    setClicked(!clicked)
    setSelectedClassId(props.topicInfo.id)
    dispatch(
      registerViewAction({
        authorId: props.topicInfo.authorId.toString(),
        customerId: userId.toString(),
        date: new Date(),
      })
    )
  }

  const closeChildScreen = useCallback(() => setClicked(false), [false])

  const topicDesc = props.topicInfo?.description

  return (
    <div>
      <Wrapper>
        <ContentArea>
          {!userInfo.subscribed && <CreateCustomerForm />}
          {authorInfo && (
            <AuthorInfoArea>
              <AuthorPhotoArea>
                <Image imageUri={authorInfo[0]?.photo_url} showText={false} />
              </AuthorPhotoArea>
              <AuthorDescriptionArea>
                {authorInfo[0]?.description}
              </AuthorDescriptionArea>
            </AuthorInfoArea>
          )}
          <TextArea>{topicDesc}</TextArea>
          <ButtonsWrapper>
            {userInfo.isLoggedIn && userInfo.subscribed && (
              <ButtonWrapper>
                <Button
                  handleClick={handleClick}
                  label={"starLesson"}
                  language={language}
                  variant="contained"
                  color="primary"
                />
              </ButtonWrapper>
            )}
          </ButtonsWrapper>
        </ContentArea>
        {clicked ? (
          <LessonFlow
            handleClick={closeChildScreen}
            topicId={selectedClassId}
          />
        ) : null}
      </Wrapper>
    </div>
  )
}

export default TopicDescription
