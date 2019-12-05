import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

import Image from "../components/Image copy";
import ClassListFullContent from '../containers/ClassListFullContent'
import logo from "../images/logo"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <Image
      imageUri={logo}
      imgHeader={'Fact:'}
      imgText={'Size of the box and qtty of boxes as well as position can be adjusted'}
      showText={true}
      additionalClass={'max-height-40-proc'} />
    <ClassListFullContent />
  </Layout>
)

export default IndexPage
