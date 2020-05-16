/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */
import '../../styles/main.scss';
import './layout.css';

import { graphql, useStaticQuery } from 'gatsby';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import Footer from '../../containers/Footer/Footer';
import Header from '../Header/header';

const Layout = ({ children, isLoggedIn }: any) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <>
      <h4>is logged in: {isLoggedIn ? "true" : "false"}</h4>
      {console.log(isLoggedIn)}
      <Header siteTitle={data.site.siteMetadata.title} />
      <div
        style={{
          margin: `0 auto`,
          paddingTop: 0,
        }}
      >
        <main>{children}</main>
        <footer>
          <Footer />
        </footer>
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  isLoggedIn: PropTypes.bool,
}

const mapStateToProps = state => ({
  isLoggedIn: state.isLoggedIn.isLoggedIn,
})
export default connect(mapStateToProps)(Layout)
