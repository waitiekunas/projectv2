import React from 'react'
import styled from "styled-components"

import PDFViewer from 'pdf-viewer-reactjs'
import { Player } from 'video-react';
import { getClassMaterials, getLessonMaterial } from '../../backEnd/ClassesUtils'
import { Box } from '../../components/Box/Box';
import Button from '../../components/Button/Button';
import { DEFAULT_BUTTON_CLASSES } from "../../Constants/Constants"
import { translations } from '../../resources/translations/translations';
import { connect } from 'react-redux';
import { Languages } from '../../enums/languages/languages';


const Wrapper = styled.div`
    width:100%;
    position: fixed;
    height: 100%;
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
    language: Languages
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

                    <Box flex={{ justify: "around" }}>
                        <Box size={{
                            maxWidth: "200px",
                            width: "25%",
                            height: "42px"
                        }}
                            flex={{
                                direction: "column",
                                justify: "center"
                            }}
                            align={{ self: "center" }}
                        >
                            <Button
                                language={this.props.language}
                                label="back"
                                buttonTexts={translations.buttons}
                                handleClick={this.handleBack}
                                classButton={DEFAULT_BUTTON_CLASSES}
                            />
                        </Box>

                        <Box size={{
                            maxWidth: "200px",
                            width: "25%",
                            height: "42px"
                        }}
                            flex={{
                                direction: "column",
                                justify: "center"
                            }}
                            align={{ self: "center" }}
                        >
                            <Button
                                language={this.props.language}
                                label="forward"
                                buttonTexts={translations.buttons}
                                handleClick={this.handleForward}
                                classButton={DEFAULT_BUTTON_CLASSES}
                            />
                        </Box>

                        <Box size={{
                            maxWidth: "200px",
                            width: "25%",
                            height: "42px"
                        }}
                            flex={{
                                direction: "column",
                                justify: "center"
                            }}
                            align={{ self: "center" }}
                        >
                            <Button
                                language={this.props.language}
                                label="close"
                                buttonTexts={translations.buttons}
                                handleClick={this.handleClick}
                                classButton={DEFAULT_BUTTON_CLASSES}
                            />
                        </Box>
                    </Box>
                </MainScreen>
            </Wrapper>
        )
    }
}
const mapStateToProps = state => ({
    language: state.language.language
});
export default connect(mapStateToProps)(LessonFlow)