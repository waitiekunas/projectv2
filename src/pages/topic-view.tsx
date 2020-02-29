import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Image from "../components/Image copy"
import TopicDescription from "../containers/TopicDescription"

const TopicView = ({ location }) => (
  <Layout>
    <SEO title="Topic-view" />
    <Image
      imageUri={"/images/wide-index-photo.jpg"}
      showText={false}
      additionalClass={'max-height-40-proc'} />
    <TopicDescription
      topicInfo={location.state.classInfo} />
  </Layout>
)

export default TopicView
