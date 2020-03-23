import React from "react"
import { Link } from "gatsby"

import Layout from "../components/Layout/layout"
import SEO from "../components/Seo/seo"

import Image from "../components/Image/Image";
import ClassListFullContent from '../containers/ClassListFullContent/ClassListFullContent'
import { Languages } from "../enums/languages/languages";

import { connect, useDispatch } from 'react-redux';
import { getLanguage } from '../state/actions/lang';
import store from '../state/createStore';
import { Box } from '../components/Box/Box';


type MyProps = {
  language: Languages,
  dispatch: any
};
type MyState = {
  language: Languages
};


class IndexPage extends React.Component<MyProps, MyState>{
  constructor(props: MyProps) {
    super(props);
    this.state = {
      language: props.language,
    };
  }

  render() {
    console.log(this.state.language)
    return (
      <Layout>
        <SEO title="Home" />
        <Image
          imageUri={"/images/index-photo.jpg"}
          imgHeader={'Fact:'}
          imgText={'Size of the box and qtty of boxes as well as position can be adjusted'}
          showText={true}
          additionalClass={'max-height-40-proc'} />
        <ClassListFullContent />
      </Layout>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return dispatch(getLanguage(Languages.LITHUANIA))
};
const mapStateToProps = state => ({
  language: state.language
});
export default connect(mapStateToProps, mapDispatchToProps)(IndexPage)
