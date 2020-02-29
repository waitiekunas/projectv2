import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"


import { connect } from 'react-redux';

import Image from '../components/Image copy';
import Button from '../components/Button';
import translations from '../resources/translations/translations.json';



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


const TopicDescription = (props: any) => {
    const btnClasses = 'button-navbar-padding navbar-btn bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white border border-blue-500 hover:border-transparent rounded'
    const translation = translations.buttons
    const handleClick = (e) => {
        e.preventDefault()
        alert("Lesson started")
    }
    const authorPhoto = props.topicInfo ? props.topicInfo.authorDesc.photo : null;
    const authorDescription = props.topicInfo ? props.topicInfo.authorDesc.description : null;
    const topicDesc = props.topicInfo ? props.topicInfo.description : null;
    return (
        <div>
            <Wrapper>
                <ContentArea>
                    {props.isLoggedIn ? <div>CONTENT</div> : null}
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
                            handleClick={handleClick}
                            classButtonDiv={'flex-col navbar-btn-cont'}
                            buttonTexts={translation}
                            label={'starLesson'}
                            language={props.language}
                            classButton={btnClasses} />
                    </Wrapper>
                </ContentArea>
            </Wrapper>

        </div>
    )
}

TopicDescription.propTypes = {
    isLoggedIn: PropTypes.bool
}

const mapStateToProps = state => ({
    isLoggedIn: state.isLoggedIn.isLoggedIn,
    language: state.language.language
});
export default connect(mapStateToProps)(TopicDescription)
