import React from 'react';

import Button from '../Button/Button';
import { Link } from "gatsby"
import { translations } from '../../resources/translations/translations';
import { connect } from 'react-redux';
import { Languages } from '../../enums/languages/languages';
import { getClassesField } from '../../utils/utils'
import { Box } from '../Box/Box';



type MyProps = {
    language: Languages
};
type MyState = {

};

class DropDown extends React.Component<MyProps, MyState> {
    // TODO: create interface for props
    constructor(props: MyProps) {
        super(props);
        this.state = {

        };
    }
    handleClick(e) {
        e.preventDefault();
        console.log('clicked')
    }

    render() {
        const language = this.props.language
        const translation = translations.buttons
        const topicNames = getClassesField('topic')
        return (
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
                <div className='dropdown'>
                    <Button
                        handleClick={this.handleClick}
                        classButtonDiv='flex-col navbar-btn flex-col flex justify-center w-full'
                        classButton={'button-navbar-padding h-full bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white border border-blue-500 hover:border-transparent rounded'}
                        buttonTexts={translation}
                        label={'dropDownButton'}
                        language={language} />
                    <div className="dropdown-content flex justify-around flex-col">
                        {
                            topicNames.map((value, index) =>
                                <Link className={"dropdown-link"} to={`/topics-screen/`} state={{ topic: value }} key={index}>{value}</Link>
                            )
                        }
                    </div>
                </div>
            </Box>
        )
    }
}

const mapStateToProps = state => ({
    language: state.language.language
});
export default connect(mapStateToProps, null)(DropDown)