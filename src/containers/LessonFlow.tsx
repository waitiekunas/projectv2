import React from 'react'
import styled from "styled-components"

const Wrapper = styled.div`
    width:100%;
   
`
const MainScreen = styled.div`
    width: 85%;
    
`

class LessonFlow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }

    }

    render() {

        return (
            <Wrapper>
                <MainScreen>
                    <h1>aaaaaaaaaaaaaaa</h1>
                </MainScreen>
            </Wrapper>
        )
    }
}
export default LessonFlow