import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

import Image from "../components/Image copy";
import ClassListFullContent from '../containers/ClassListFullContent'
import { Property } from '@babel/types';
import { getTranslations } from '../utils/utils'
import { Languages } from "../enums/languages/languages";
import AppState from "../interfaces/IAppState";

import { connect, useDispatch } from 'react-redux';
import { getLanguage } from '../state/actions/lang';
import { GET_LANGUAGE } from "../state/actions/actions";


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
        <ClassListFullContent
          getTranslations={getTranslations}
          language={this.state.language}
        />
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
