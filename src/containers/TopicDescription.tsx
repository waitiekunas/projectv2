import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"


import { connect } from 'react-redux';

import Image from '../components/Image copy';
import Button from '../components/Button';
import BuyPoster from '../components/BuyPoster'
import translations from '../resources/translations/translations.json';
import LessonFlow from './LessonFlow';
import { Languages } from "../enums/languages/languages";



const Wrapper = styled.div`
    display: flex;
    justify-content: center;
`
const ContentArea = styled.div`
    width: 80%;
`
const TextArea = styled.p`
    text-align: center;
    padding: 1rem;
`

const AuthorInfoArea = styled.div`
    display: flex;
    padding: 1rem;
    @media (max-width: 767px) {
        flex-direction: column;
    }
`
const AuthorPhotoArea = styled.div`
    width: 25%;
    padding: 1rem;
`
const AuthorDescriptionArea = styled.div`
    width: 70%;
    padding: 1rem;
`
type MyProps = {
    topicInfo: {
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
}

class TopicDescription extends React.Component<MyProps, MyState> {
    constructor(props: MyProps) {
        super(props);
        this.state = {
            clicked: false,
        }
    }

    handleClick = (e) => {
        e.preventDefault();
        this.setState({ clicked: !this.state.clicked });
    }

    render() {
        const authorPhoto = this.props.topicInfo ? this.props.topicInfo.authorDesc.photo : null;
        const authorDescription = this.props.topicInfo ? this.props.topicInfo.authorDesc.description : null;
        const topicDesc = this.props.topicInfo ? this.props.topicInfo.description : null;
        const btnClasses = 'button-navbar-padding navbar-btn bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white border border-blue-500 hover:border-transparent rounded'
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
                        <Wrapper>
                            <Button
                                handleClick={this.handleClick}
                                classButtonDiv={'flex-col navbar-btn-cont'}
                                buttonTexts={translation}
                                label={'starLesson'}
                                language={this.props.language}
                                classButton={btnClasses} />
                        </Wrapper>

                    </ContentArea>
                </Wrapper>

            </div>
        )
    }
}



const mapStateToProps = state => ({
    isLoggedIn: state.isLoggedIn.isLoggedIn,
    language: state.language.language
});
export default connect(mapStateToProps)(TopicDescription)
