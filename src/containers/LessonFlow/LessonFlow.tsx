import React, { useEffect, useState } from "react"
import { Document, Page } from "react-pdf/dist/esm/entry.webpack"
import { useDispatch, useSelector } from "react-redux"
import styled from "styled-components"
import { LoadingSpinner, Player } from "video-react"

import { Button } from "../../components/Button/Button"
import { PlaylistItem } from "../../components/PlaylistItem/PlaylistItem"
import { LessonMaterial } from "../../interfaces/lesson/ILessonMaterial"
import { loadLessonsMaterialAction } from "../../state/actions/apiData.actions"
import { selectLessonsMaterial } from "../../state/selectors/apiData.selector"
import { selectLanguage } from "../../state/selectors/userData.selector"
import {
  Background,
  ButtonBox,
  Content,
  LessonFileList,
  LessonWrapper,
  MainScreen,
  StyledCentered,
  StyledExitDiv,
  StyledP,
  StyledPDFContainer,
  ViewContainer,
  Wrapper,
} from "./styles"

export type ActiveView = {
  name: string
  resource_id: string
  type: string
  queue: number
}

type MyProps = {
  handleClick: Function
  topicId: number
}

const StyledPage = styled(Page)`
  display: flex;
  justify-content: center;
`
const LessonFlow: React.FC<MyProps> = ({ handleClick, topicId }) => {
  const dispatch = useDispatch()
  const materialInfo = useSelector(selectLessonsMaterial)
  const language = useSelector(selectLanguage)
  const [sortedLesson, setSortedLesson] = useState<LessonMaterial[]>([])
  const [activeView, setActiveView] = useState<ActiveView | undefined>()
  const [showPdf, setShowPDF] = useState<boolean>(false)
  const [numPages, setNumPages] = useState(null)
  const [pageNumber, setPageNumber] = useState(1)
  useEffect(() => {
    let topicInfo = new FormData()
    topicInfo.append("id", topicId.toString())
    dispatch(loadLessonsMaterialAction(topicInfo))
  }, [])
  useEffect(() => {
    const array = [...materialInfo]
    array.sort((a, b) => a.queue - b.queue)
    setSortedLesson(array)
    setActiveView(array[0])
  }, [materialInfo])
  useEffect(() => {
    setShowPDF(activeView?.type.includes("pdf"))
  }, [activeView])
  const handleLocalClick = e => {
    e.preventDefault()
    handleClick()
  }
  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages)
    setPageNumber(1)
  }
  const changePage = offset => {
    setPageNumber(prevPageNumber => prevPageNumber + offset)
  }

  const previousPage = () => {
    changePage(-1)
  }

  const nextPage = () => {
    changePage(1)
  }
  return (
    <>
      <Background />

      <Wrapper>
        <MainScreen>
          <StyledExitDiv>
            <button onClick={handleLocalClick}>X</button>
          </StyledExitDiv>
          <LessonWrapper>
            {activeView && (
              <ViewContainer>
                {showPdf ? (
                  <StyledPDFContainer>
                    <Document
                      file={activeView?.resource_id}
                      onLoadSuccess={onDocumentLoadSuccess}
                    >
                      <StyledPage pageNumber={pageNumber} />
                    </Document>
                    <StyledPDFContainer>
                      <StyledCentered>
                        <StyledP>
                          Page {pageNumber || (numPages ? 1 : "--")} of{" "}
                          {numPages || "--"}
                        </StyledP>
                      </StyledCentered>
                      <Content>
                        <ButtonBox>
                          <Button
                            language={language}
                            label="back"
                            handleClick={previousPage}
                            disabled={pageNumber <= 1}
                            color="primary"
                            variant="contained"
                          />
                        </ButtonBox>

                        <ButtonBox>
                          <Button
                            language={language}
                            label="forward"
                            handleClick={nextPage}
                            disabled={pageNumber >= numPages}
                            color="primary"
                            variant="contained"
                          />
                        </ButtonBox>
                      </Content>
                    </StyledPDFContainer>
                  </StyledPDFContainer>
                ) : (
                  <Player queue={activeView?.queue}>
                    <LoadingSpinner />
                    <source src={activeView?.resource_id} />
                  </Player>
                )}
              </ViewContainer>
            )}
            <LessonFileList>
              {sortedLesson.map(lesson => (
                <PlaylistItem
                  active={activeView?.resource_id === lesson.resource_id}
                  lesson={lesson}
                  handeClick={setActiveView}
                />
              ))}
            </LessonFileList>
          </LessonWrapper>
        </MainScreen>
      </Wrapper>
    </>
  )
}

export default LessonFlow
