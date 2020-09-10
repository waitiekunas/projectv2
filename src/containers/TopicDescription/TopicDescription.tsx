import axios from 'axios';
import { Link } from 'gatsby';
import React, { useCallback, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { Box } from '../../components/Box/Box';
import Button from '../../components/Button/Button';
import BuyPoster from '../../components/BuyPosyer/BuyPoster';
import Image from '../../components/Image/Image';
import { DEFAULT_BUTTON_CLASSES } from '../../Constants/Constants';
import { Languages } from '../../enums/languages/languages';
import { translations } from '../../resources/translations/translations';
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
const ButtonWrapper = styled.div`
  height: auto;
  display: flex;
  justify-content: center;
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
          {!props.isLoggedIn && (
            <BuyPoster
              additionalClass={""}
              imageUri={"/images/wide-index-photo.jpg"}
              showText={true}
              imgHeader={"dont have?"}
              imgText={"Buy!"}
            />
          )}

          {authorInfo && (
            <AuthorInfoArea>
              <AuthorPhotoArea>
                <Image
                  additionalClass={""}
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
          <Box
            size={{
              width: "100%",
            }}
            flex={{
              direction: "column",
              justify: "center",
            }}
          >
            <Box
              size={{
                maxWidth: "200px",
                width: "25%",
                height: "42px",
              }}
              align={{ self: "center" }}
              margin={{ top: "0.5rem" }}
            >
              <Button
                handleClick={handleClick}
                buttonTexts={translation}
                label={"starLesson"}
                language={props.language}
                classButton={DEFAULT_BUTTON_CLASSES}
              />
            </Box>
            {props.isLoggedIn && (
              <Box
                size={{
                  maxWidth: "200px",
                  width: "25%",
                  height: "42px",
                }}
                align={{ self: "center" }}
                margin={{ top: "0.5rem" }}
              >
                <Link to={`/upload-screen/`}>
                  <Button
                    handleClick={() => null}
                    buttonTexts={translation}
                    label={"upload"}
                    language={props.language}
                    classButton={DEFAULT_BUTTON_CLASSES}
                  />
                </Link>
              </Box>
            )}
          </Box>
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
  isLoggedIn: state.loginData.isLoggedIn,
  language: state.language.language,
  canUpload: state.loginData.canUpload,
})
export default connect(mapStateToProps)(TopicDescription)
