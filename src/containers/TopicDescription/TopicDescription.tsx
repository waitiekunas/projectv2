import axios from 'axios';
import { Link } from 'gatsby';
import React, { useCallback, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { Button } from '../../components/Button/Button';
import { Image } from '../../components/Image/Image';
import { DEFAULT_BUTTON_CLASSES } from '../../Constants/Constants';
import { Languages } from '../../enums/languages/languages';
import { translations } from '../../resources/translations/translations';
import CancelSubscription from '../CancelSubscription/CancelSubscription';
import CreateCustomerForm from '../CreateCustomerForm/CreateCustomerForm';
import LessonFlow from '../LessonFlow/LessonFlow';

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
  width:100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
`

const ButtonWrapper = styled.div`
  max-width: 200px;
  width:25%;
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
  language: Languages
  isLoggedIn: boolean
  canUpload: boolean
  isSubscribed: boolean
}

const TopicDescription = (props: MyProps) => {
  const [clicked, setClicked] = useState(false)
  const [selectedClassId, setSelectedClassId] = useState(0)
  const [authorInfo, setAuthorInfo] = useState<any>()
  useEffect(() => {
    let author = new FormData()
    author.append("id", props.topicInfo.authorId.toString())
    axios.post(process.env.GET_AUTHOR_INFO_URL, author).then(res => {
      setAuthorInfo(res.data)
    })
  }, [])
  const handleClick = e => {
    e.preventDefault()
    setClicked(!clicked)
    setSelectedClassId(props.topicInfo.id)
  }

  const closeChildScreen = useCallback(() => setClicked(false), [false])

  const topicDesc = props.topicInfo?.description

  const translation = translations
  return (
    <div>
      <Wrapper>
        <ContentArea>
          {!props.isSubscribed && <CreateCustomerForm />}
          {props.isSubscribed && <CancelSubscription />}
          {authorInfo && (
            <AuthorInfoArea>
              <AuthorPhotoArea>
                <Image
                  imageUri={authorInfo[0].photo_url}
                  showText={false}
                />
              </AuthorPhotoArea>
              <AuthorDescriptionArea>
                {authorInfo[0].description}
              </AuthorDescriptionArea>
            </AuthorInfoArea>
          )}
          <TextArea>{topicDesc}</TextArea>
          <ButtonsWrapper>
            {props.isLoggedIn && props.isSubscribed && (
              <ButtonWrapper>
                <Button
                  handleClick={handleClick}
                  buttonTexts={translation}
                  label={"starLesson"}
                  language={props.language}
                  classButton={DEFAULT_BUTTON_CLASSES}
                />
              </ButtonWrapper>
            )}
            {props.isLoggedIn && props.canUpload && (
              <ButtonWrapper>
                <Link to={`/upload-screen/`}>
                  <Button
                    handleClick={() => null}
                    buttonTexts={translation}
                    label={"upload"}
                    language={props.language}
                    classButton={DEFAULT_BUTTON_CLASSES}
                  />
                </Link>
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

const mapStateToProps = state => ({
  isLoggedIn: state.isLoggedIn.isLoggedIn,
  language: state.language.language,
  canUpload: state.isLoggedIn.canUpload,
  isSubscribed: state.isLoggedIn.subscribed,
})
export default connect(mapStateToProps)(TopicDescription)
