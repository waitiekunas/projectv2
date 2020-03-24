import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"


import { connect } from 'react-redux';

import Image from '../../components/Image/Image';
import Button from '../../components/Button/Button';
import BuyPoster from '../../components/BuyPosyer/BuyPoster'
import { translations } from '../../resources/translations/translations';
import LessonFlow from '../LessonFlow/LessonFlow';
import { Languages } from "../../enums/languages/languages";
import { Box } from "../../components/Box/Box";
import { DEFAULT_BUTTON_CLASSES } from "../../Constants/Constants";



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
            photo: string,
            description: string
        },
        description: string
    },
    language: Languages,
    isLoggedIn: boolean
}

type MyState = {
    clicked: boolean
    selectedClassId: number
}

class TopicDescription extends React.Component<MyProps, MyState> {
    constructor(props: MyProps) {
        super(props);
        this.state = {
            clicked: false,
            selectedClassId: 0
        }
    }

    handleClick = (e) => {
        e.preventDefault();
        this.setState({
            clicked: !this.state.clicked,
            selectedClassId: this.props.topicInfo.id
        });
    }
    handleChildClick = (state, value) => {
        this.setState({ [state]: value } as MyState);
    }

    render() {
        const authorPhoto = this.props.topicInfo ? this.props.topicInfo.authorDesc.photo : null;
        const authorDescription = this.props.topicInfo ? this.props.topicInfo.authorDesc.description : null;
        const topicDesc = this.props.topicInfo ? this.props.topicInfo.description : null;
        const btnClasses = 'button-navbar-padding bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white border border-blue-500 hover:border-transparent rounded'
        const translation = translations.buttons
        return (
            <div>
                <Wrapper>
                    <ContentArea>
                        {this.props.isLoggedIn ?
                            null
                            : <BuyPoster
                                additionalClass={''}
                                imageUri={"/images/wide-index-photo.jpg"}
                                showText={true}
                                imgHeader={"dont have?"}
                                imgText={"Buy!"} />}
                        <AuthorInfoArea>
                            <AuthorPhotoArea>
                                <Image
                                    additionalClass={''}
                                    imageUri={authorPhoto}
                                    showText={false} />
                            </AuthorPhotoArea>
                            <AuthorDescriptionArea>{authorDescription}</AuthorDescriptionArea>
                        </AuthorInfoArea>
                        <TextArea>{topicDesc}</TextArea>
                        <Box size={{
                            width: "100%",
                            height: "42px"
                        }}
                            flex={{
                                direction: "row",
                                justify: "center"
                            }}
                        >
                            <Box size={{
                                maxWidth: "200px",
                                width: "25%",
                                height: "42px"
                            }}
                                align={{ self: "center" }}
                            >
                                <Button
                                    handleClick={this.handleClick}
                                    buttonTexts={translation}
                                    label={'starLesson'}
                                    language={this.props.language}
                                    classButton={DEFAULT_BUTTON_CLASSES} />
                            </Box>
                        </Box>

                    </ContentArea>
                    {
                        this.state.clicked ? <LessonFlow handleClick={this.handleChildClick} topicId={this.state.selectedClassId} /> : null
                    }
                </Wrapper>

            </div >
        )
    }
}



const mapStateToProps = state => ({
    isLoggedIn: state.isLoggedIn.isLoggedIn,
    language: state.language.language
});
export default connect(mapStateToProps)(TopicDescription)