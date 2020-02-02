import React from 'react';
import styled from "styled-components"
import ClassTicket from '../components/ClassTicket';

import { getClassesByTopic } from '../utils/utils'

type MyProps = {
    topic: string
};
type MyState = {

};
const Wrapper = styled.div`
display: flex;
justify-content: center;
`
const TopicsWrapper = styled.div`
width: 80%;
margin: 0px;
display: flex;
flex-wrap: wrap;
`
const TopicWrapper = styled.div`
width: 25%;
margin: 0px;
`
class TopicsContainer extends React.Component<MyProps, MyState>{
    constructor(props: MyProps) {
        super(props);
        this.state = {

        }
    }

    render() {
        const classes = getClassesByTopic(this.props.topic)
        return (
            <Wrapper>
                <TopicsWrapper className={'TopicsWrapper'}>
                    {
                        classes.map((value, index) =>
                            <TopicWrapper className={'TopicWrapper'}>
                                <ClassTicket
                                    key={index}
                                    text={value.name}
                                    imageUri={"/images/logo192.png"} />
                            </TopicWrapper>

                        )
                    }
                </TopicsWrapper>
            </Wrapper>
        )
    }

}

export default TopicsContainer