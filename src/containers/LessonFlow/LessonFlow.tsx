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


const Background = styled.div`
    width:150%;
    position: fixed;
    height: 100%;
    top: 0%;
   
    background-color: rgba(0,0,0,0.5);
`
const MainScreen = styled.div`
    width: 85%;
    z-index: 10;
`
const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    height: 100%;
    width:100%;
    position: absolute;
    top: 5%;
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
    addId = () => {
        do {
            document.getElementsByClassName('has-background-black')[0] && document.getElementsByClassName('has-background-black')[0].setAttribute('id', 'customHeight')
            debugger
        } while (document.getElementsByClassName('has-background-black').length === 0)

    }

    render() {
        let { topicId, currentStep } = this.state;
        let material = getLessonMaterial(topicId, currentStep - 1)
        let linkMaterial = material && material.link
        let type = material && material.type

        return (
            <>

                <Background >
                </Background>
                <Wrapper>
                    <MainScreen >
                        {
                            type === 'pdf' &&
                            <PDFViewer
                                document={{
                                    url: linkMaterial
                                }}
                                canvasCss='canvas'
                                nacbarWrapper='customHeight'
                            />
                        }}

                        {type === 'video' ?
                            <Player>
                                <source src={linkMaterial.toString()} />
                            </Player> : null}

                        <Box
                            flex={{ justify: "around" }}
                            margin={{ top: ['32px', '32px', '12px'] }}
                        >
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
                                    style={{ background: '#4299e1' }}
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
                                    style={{ background: '#4299e1' }}
                                />
                            </Box>
                        </Box>
                    </MainScreen>
                </Wrapper>
            </>)
    }
}
const mapStateToProps = state => ({
    language: state.language.language
});
export default connect(mapStateToProps)(LessonFlow)