import React from 'react'
import styled from "styled-components"

import PDFViewer from 'pdf-viewer-reactjs'
import { Player } from 'video-react';

const Wrapper = styled.div`
    width:100%;
    position: absolute;
    min-height: 120%;
    top: 0%;
    display: flex;
    justify-content: center;
    background-color: rgba(0,0,0,0.5);
`
const MainScreen = styled.div`
    width: 85%;
    
`
type MyProps = {
    handleClick: Function
}
type MyState = {
    pdfView: boolean
    videoView: boolean
}
class LessonFlow extends React.Component<MyProps, MyState> {
    constructor(props: MyProps) {
        super(props);
        this.state = {
            pdfView: true,
            videoView: false
        }

    }
    handleClick = (e) => {
        e.preventDefault();
        this.props.handleClick('clicked', false);
    }
    handleBack = (e) => {
        e.preventDefault();
        this.setState({ 'pdfView': true })
        this.setState({ 'videoView': false })
    }
    handleForward = (e) => {
        e.preventDefault();
        this.setState({ 'pdfView': false })
        this.setState({ 'videoView': true })
    }
    render() {

        return (
            <Wrapper >
                <MainScreen >
                    {this.state.pdfView ?
                        <PDFViewer
                            document={{
                                url: '/mock/pdfMock.pdf'
                            }}
                            canvasCss='canvas'

                        /> : null}
                    {this.state.videoView ?
                        <Player>
                            <source src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4" />
                        </Player> : null}
                    <button className='red' onClick={this.handleBack}>Atgal</button>
                    <div></div>
                    <button className='red' onClick={this.handleForward}>Pirmyn</button>
                    <div></div>
                    <button className='red' onClick={this.handleClick}>Close</button>
                </MainScreen>
            </Wrapper>
        )
    }
}
export default LessonFlow