import React from "react"

import Layout from "../components/Layout/layout"
import SEO from "../components/Seo/seo"
import UploadContainer from "../containers/Upload/uploadContainer"

const UploadScreen = ({ location }) => (
  <Layout>
    <SEO title="Upload-screen" />
    <UploadContainer />
  </Layout>
)

export default UploadScreen
