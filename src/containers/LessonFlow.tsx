import React from 'react'
import styled from "styled-components"

import PDFViewer from 'pdf-viewer-reactjs'
import { Player } from 'video-react';
import { getClassMaterials, getLessonMaterial } from '../backEnd/ClassesUtils'

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
    topicId: number
}
type MyState = {
    pdfView: boolean
    videoView: boolean
    topicId: number
    currentStep: number
    materialInfo: any
}
class LessonFlow extends React.Component<MyProps, MyState> {
    constructor(props: MyProps) {
        super(props);
        this.state = {
            pdfView: null,
            videoView: false,
            topicId: this.props.topicId,
            currentStep: 0,
            materialInfo: {}
        }

    }
    componentDidMount() {

        this.setState({
            materialInfo: getClassMaterials(this.state.topicId),
            currentStep: this.state.currentStep + 1
        })
    }

    handleClick = (e) => {
        e.preventDefault();
        this.props.handleClick('clicked', false);
    }
    handleBack = (e) => {
        e.preventDefault();
        if (this.state.currentStep - 1 > 0) {
            this.setState({ currentStep: this.state.currentStep - 1 })
        }
        //handle end of lesson)
    }
    handleForward = (e) => {
        e.preventDefault();
        if (this.state.currentStep + 1 <= this.state.materialInfo.qtty) {
            this.setState({ currentStep: this.state.currentStep + 1 })
        }
        //handle end of lesson

    }
    render() {
        let { topicId, currentStep } = this.state;
        let material = getLessonMaterial(topicId, currentStep - 1)
        let linkMaterial = material && material.link
        let type = material && material.type

        debugger
        return (
            <Wrapper >
                <MainScreen >
                    {type === 'pdf' ?
                        <PDFViewer
                            document={{
                                url: linkMaterial
                            }}
                            canvasCss='canvas'

                        /> : null}
                    {type === 'video' ?
                        <Player>
                            <source src={linkMaterial.toString()} />
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