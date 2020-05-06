import React from 'react';

import Layout from '../components/Layout/layout';
import SEO from '../components/Seo/seo';
import TopicDescription from '../containers/TopicDescription/TopicDescription';

const TopicView = ({ location }) => (
  <Layout>
    <SEO title="Topic-view" />
    <TopicDescription topicInfo={location.state && location.state.classInfo} />
  </Layout>
)

export default TopicView
