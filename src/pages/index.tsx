import React from 'react';
import { connect } from 'react-redux';

import Image from '../components/Image/Image';
import Layout from '../components/Layout/layout';
import SEO from '../components/Seo/seo';
import ClassListFullContent from '../containers/ClassListFullContent/ClassListFullContent';
import { Languages } from '../enums/languages/languages';
import { getLanguage } from '../state/actions/lang';

type MyProps = {
  language: Languages
  dispatch: any
}
type MyState = {
  language: Languages
}

class IndexPage extends React.Component<MyProps, MyState> {
  constructor(props: MyProps) {
    super(props)
    this.state = {
      language: props.language,
    }
  }

  render() {
    return (
      <Layout>
        <SEO title="Home" />
        <Image
          imageUri={"/images/index-photo.jpg"}
          imgHeader={"Fact:"}
          imgText={
            "Size of the box and qtty of boxes as well as position can be adjusted"
          }
          showText={true}
          additionalClass={"max-height-40-proc"}
        />
        <ClassListFullContent />
      </Layout>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return dispatch(getLanguage(Languages.LITHUANIA))
}
const mapStateToProps = state => ({
  language: state.language,
})
export default connect(mapStateToProps, mapDispatchToProps)(IndexPage)
