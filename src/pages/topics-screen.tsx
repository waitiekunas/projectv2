import React from 'react';

import { Image } from '../components/Image/Image';
import Layout from '../components/Layout/layout';
import SEO from '../components/Seo/seo';
import TopicsContainer from '../containers/TopicsContainer/TopicsContainer';

const TopicsScreen = () => (
  <Layout>
    <SEO title="Page two" />
    <Image
      imageUri={"/images/wide-index-photo.jpg"}
      showText={false}
    />
    <TopicsContainer />
  </Layout>
)

export default TopicsScreen
