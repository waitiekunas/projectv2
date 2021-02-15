import React, { useEffect, useState } from 'react';
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';
import { useDispatch, useSelector } from 'react-redux';
import { Player } from 'video-react';

import { Button } from '../../components/Button/Button';
import { PlaylistItem } from '../../components/PlaylistItem/PlaylistItem';
import { LessonMaterial } from '../../interfaces/lesson/ILessonMaterial';
import { loadLessonsMaterialAction } from '../../state/actions/apiData.actions';
import { selectLessonsMaterial } from '../../state/selectors/apiData.selector';
import { selectLanguage } from '../../state/selectors/userData.selector';
import { Background, ButtonBox, Content, LessonFileList, LessonWrapper, MainScreen, ViewContainer, Wrapper } from './styles';

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

const LessonFlow: React.FC<MyProps> = ({ handleClick, topicId }) => {
  const dispatch = useDispatch()
  const materialInfo = useSelector(selectLessonsMaterial)
  const language = useSelector(selectLanguage)
  const [sortedLesson, setSortedLesson] = useState<LessonMaterial[]>([])
  const [activeView, setActiveView] = useState<ActiveView | undefined>()
  const [showPdf, setShowPDF] = useState<boolean>(false)
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

  return (
    <>
      <Background />
      <Wrapper>
        <MainScreen>
          <LessonWrapper>
            <ViewContainer>
              {showPdf ? (
                <Document
                  file={activeView?.resource_id}
                  onLoadSuccess={() => null}
                >
                  <Page pageNumber={1} />
                </Document>
              ) : (
                <Player queue={activeView?.queue}>
                  <source src={activeView?.resource_id} />
                </Player>
              )}
            </ViewContainer>
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
          <Content>
            <ButtonBox>
              <Button
                language={language}
                label="back"
                handleClick={() => null}
                disabled={false}
                color="primary"
                variant="contained"
              />
            </ButtonBox>

            <ButtonBox>
              <Button
                language={language}
                label="forward"
                handleClick={() => null}
                disabled={false}
                color="primary"
                variant="contained"
              />
            </ButtonBox>

            <ButtonBox>
              <Button
                language={language}
                label="close"
                handleClick={handleLocalClick}
                color="primary"
                variant="contained"
              />
            </ButtonBox>
          </Content>
        </MainScreen>
      </Wrapper>
    </>
  )
}

export default LessonFlow
