import React from "react"
import { Link } from "gatsby"

import Layout from "../components/Layout/layout"
import SEO from "../components/Seo/seo"
import Image from "../components/Image/Image"
import TopicDescription from "../containers/TopicDescription/TopicDescription"

const TopicView = ({ location }) => (
  <Layout>
    <SEO title="Topic-view" />
    <TopicDescription
      topicInfo={location.state && location.state.classInfo} />
  </Layout>
)

export default TopicView
