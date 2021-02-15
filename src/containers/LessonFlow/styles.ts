import styled from 'styled-components';

export const Background = styled.div`
  width: 150%;
  position: fixed;
  height: 100%;
  top: 0%;

  background-color: rgba(0, 0, 0, 0.5);
`
export const MainScreen = styled.div`
  width: 85%;
  z-index: 10;
`
export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  height: 100%;
  width: 100%;
  position: absolute;
  top: 5%;
`
export const Content = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 32px;
`
export const ButtonBox = styled.div`
  max-width: 200px;
  width: 25%;
  height: 42px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-self: center;
`

export const LessonWrapper = styled.div`
    width:100%;
    display:flex;
    justify-content:center;
    flex-direction:row;
    @media (max-width: 480px){
        flex-direction: column;
    }
`

export const LessonFileList = styled.div`
    width:30%;
    display: flex;
    justify-content:left;
    flex-direction:column;
    @media(max-width:480px){
        width:100%;
    }
`

export const ViewContainer = styled.div`
    width:70%;
    display: flex;
    justify-content:center;
    @media(max-width:480px){
        width:100%;
    }
`