import axios from 'axios';
import PDFViewer from 'pdf-viewer-reactjs';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Player } from 'video-react';

import { Box } from '../../components/Box/Box';
import Button from '../../components/Button/Button';
import { DEFAULT_BUTTON_CLASSES } from '../../Constants/Constants';
import { Languages } from '../../enums/languages/languages';
import { LessonMaterial } from '../../interfaces/lesson/ILessonMaterial';
import { translations } from '../../resources/translations/translations';

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
type MyProps = {
  handleClick: Function
  topicId: number
  language: Languages
}

const LessonFlow = (props: MyProps) => {
  const [topicId, setTopicId] = useState(props.topicId)
  const [currentStep, setCurrentStep] = useState(0)
  const [materialInfo, setMaterialInfo] = useState<LessonMaterial[]>([])
  const [disableForwardButton, setDisabledForwardButton] = useState(false)
  const [disableBackButton, setDisableBackButton] = useState(true)
  const [flow, setFlow] = useState<any[]>([null])
  useEffect(() => {
    let topicInfo = new FormData()
    topicInfo.append("id", topicId.toString())
    axios
      .post("http://localhost:5000/lesson/getLesson", topicInfo)
      .then(res => {
        setMaterialInfo(res.data)
      })
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
          />
        )
      } else if (lesson?.type.includes("video")) {
        array.push(
          <Player>
            <source src={lesson.resource_id} />
          </Player>
        )
      } else {
        array.push(null)
      }
    })

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
  const addId = () => {
    do {
      document.getElementsByClassName("has-background-black")[0] &&
        document
          .getElementsByClassName("has-background-black")[0]
          .setAttribute("id", "customHeight")
    } while (
      document.getElementsByClassName("has-background-black").length === 0
    )
  }

  const renderPDFViewer = (link: string) => (
    <PDFViewer
      document={{
        url: link,
      }}
      canvasCss="canvas"
      nacbarWrapper="customHeight"
    />
  )
  let material = materialInfo && materialInfo[currentStep]
  let linkMaterial = material?.resource_id
  let type = material?.type
  return (
    <>
      <Background></Background>
      <Wrapper>
        <MainScreen>
          {flow[currentStep]}
          <Box
            flex={{ justify: "around" }}
            margin={{ top: ["32px", "32px", "12px"] }}
          >
            <Box
              size={{
                maxWidth: "200px",
                width: "25%",
                height: "42px",
              }}
              flex={{
                direction: "column",
                justify: "center",
              }}
              align={{ self: "center" }}
            >
              <Button
                language={props.language}
                label="back"
                buttonTexts={translations}
                handleClick={handleBack}
                classButton={DEFAULT_BUTTON_CLASSES}
                disabled={disableBackButton}
              />
            </Box>

            <Box
              size={{
                maxWidth: "200px",
                width: "25%",
                height: "42px",
              }}
              flex={{
                direction: "column",
                justify: "center",
              }}
              align={{ self: "center" }}
            >
              <Button
                language={props.language}
                label="forward"
                buttonTexts={translations}
                handleClick={handleForward}
                classButton={DEFAULT_BUTTON_CLASSES}
                style={{ background: "#4299e1" }}
                disabled={disableForwardButton}
              />
            </Box>

            <Box
              size={{
                maxWidth: "200px",
                width: "25%",
                height: "42px",
              }}
              flex={{
                direction: "column",
                justify: "center",
              }}
              align={{ self: "center" }}
            >
              <Button
                language={props.language}
                label="close"
                buttonTexts={translations}
                handleClick={handleClick}
                classButton={DEFAULT_BUTTON_CLASSES}
                style={{ background: "#4299e1" }}
              />
            </Box>
          </Box>
        </MainScreen>
      </Wrapper>
    </>
  )
}
const mapStateToProps = state => ({
  language: state.language.language,
})
export default connect(mapStateToProps)(LessonFlow)
