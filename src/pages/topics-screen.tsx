import React from "react"
import { Link } from "gatsby"

import Layout from "../components/Layout/layout"
import SEO from "../components/Seo/seo"
import Image from "../components/Image/Image"
import TopicsContainer from "../containers/TopicsContainer/TopicsContainer"

const TopicsScreen = ({ location }) => (
  <Layout>
    <SEO title="Page two" />
    <Image
      imageUri={"/images/wide-index-photo.jpg"}
      showText={false}
      additionalClass={'max-height-40-proc'} />
    <TopicsContainer topic={location.state && location.state.topic} />
  </Layout>
)

export default TopicsScreen
