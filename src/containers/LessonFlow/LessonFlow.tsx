import PDFViewer from 'pdf-viewer-reactjs';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { Player } from 'video-react';

import { Button } from '../../components/Button/Button';
import { DEFAULT_BUTTON_CLASSES } from '../../Constants/Constants';
import { Languages } from '../../enums/languages/languages';
import { translations } from '../../resources/translations/translations';
import { loadLessonsMaterialAction } from '../../state/actions/apiData.actions';
import { selectLessonsMaterial } from '../../state/selectors/apiData.selector';
import { selectLanguage } from '../../state/selectors/userData.selector';

const Background = styled.div`
  width: 150%;
  position: fixed;
  height: 100%;
  top: 0%;

  background-color: rgba(0, 0, 0, 0.5);
`
const MainScreen = styled.div`
  width: 85%;
  z-index: 10;
`
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  height: 100%;
  width: 100%;
  position: absolute;
  top: 5%;
`
const Content = styled.div`
  display:flex;
  justify-content:space-around;
  margin-top: 32px;
`
const ButtonBox = styled.div`
  max-width: 200px;
  width:25%;
  height:42px;
  display:flex;
  justify-content:center;
  flex-direction:column;
  align-self:center;
`

type MyProps = {
  handleClick: Function
  topicId: number
  language: Languages
}

const LessonFlow = (props: MyProps) => {
  const dispatch = useDispatch()
  const materialInfo = useSelector(selectLessonsMaterial)
  const language = useSelector(selectLanguage)
  const [topicId, setTopicId] = useState(props.topicId)
  const [currentStep, setCurrentStep] = useState(0)
  const [disableForwardButton, setDisabledForwardButton] = useState(false)
  const [disableBackButton, setDisableBackButton] = useState(true)
  const [flow, setFlow] = useState<any[]>([null])
  useEffect(() => {
    let topicInfo = new FormData()
    topicInfo.append("id", topicId.toString())
    dispatch(loadLessonsMaterialAction(topicInfo))
  }, [])
  useEffect(() => {
    setDisabledForwardButton(currentStep + 1 === materialInfo.length)
    setDisableBackButton(currentStep === 0)
  }, [currentStep])
  useEffect(() => {
    let array = []
    materialInfo?.forEach(lesson => {
      if (lesson?.type.includes("pdf")) {
        array.push(
          <PDFViewer
            document={{
              url: lesson.resource_id,
            }}
            canvasCss="canvas"
            nacbarWrapper="customHeight"
            queue={lesson.queue}
          />
        )
      } else if (lesson?.type.includes("video")) {
        array.push(
          <Player queue={lesson.queue}>
            <source src={lesson.resource_id} />
          </Player>
        )
      } else {
        array.push(null)
      }
    })
    array.sort((a, b) => a.props.queue - b.props.queue)
    setFlow(array)
  }, [materialInfo])
  const handleClick = e => {
    e.preventDefault()
    props.handleClick()
  }
  const handleBack = e => {
    e.preventDefault()
    let step = currentStep
    if (currentStep > 0) {
      step -= 1
    }
    setCurrentStep(step)
    //handle end of lesson)
  }
  const handleForward = e => {
    e.preventDefault()
    let step = currentStep
    if (currentStep + 1 < materialInfo.length) {
      step += 1
    }
    setCurrentStep(step)
    //handle end of lesson
  }
  const sortLessons = (lessons: any[]) => {
    let sortedArray = []
  }
  return (
    <>
      <Background></Background>
      <Wrapper>
        <MainScreen>
          {flow[currentStep]}
          <Content>
            <ButtonBox>
              <Button
                language={language}
                label="back"
                buttonTexts={translations}
                handleClick={handleBack}
                classButton={DEFAULT_BUTTON_CLASSES}
                disabled={disableBackButton}
              />
            </ButtonBox>

            <ButtonBox>
              <Button
                language={language}
                label="forward"
                buttonTexts={translations}
                handleClick={handleForward}
                classButton={DEFAULT_BUTTON_CLASSES}
                style={{ background: "#4299e1" }}
                disabled={disableForwardButton}
              />
            </ButtonBox>

            <ButtonBox>
              <Button
                language={language}
                label="close"
                buttonTexts={translations}
                handleClick={handleClick}
                classButton={DEFAULT_BUTTON_CLASSES}
                style={{ background: "#4299e1" }}
              />
            </ButtonBox>
          </Content>
        </MainScreen>
      </Wrapper>
    </>
  )
}

export default LessonFlow
