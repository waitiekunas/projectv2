import React from "react"

import Layout from "../components/Layout/layout"
import SEO from "../components/Seo/seo"
import TopicsContainer from "../containers/TopicsContainer/TopicsContainer"

const TopicsScreen = () => (
  <Layout>
    <SEO title="Page two" />
    <TopicsContainer />
  </Layout>
)

export default TopicsScreen
