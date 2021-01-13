/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */
import '../../styles/main.scss';
import './layout.css';

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { graphql, useStaticQuery } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import Footer from '../../containers/Footer/Footer';
import Header from '../Header/header';

const StyledDiv = styled.div`
  margin: 0 auto;
  padding-top: 0;
`
const Layout = ({ children }: any) => {
  const stripePromise = loadStripe(
    "pk_test_51HHXdGJtXEcPW0Zh0dXxdrEnVgQKM0lOtmkFOir7Jei49sfPEhkxUYPKwKLREiNfRXN3LBe29j78Zet3mN5KkXic00YbZJIqoT"
  )
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
    <Elements stripe={stripePromise}>
      <Header siteTitle={data.site.siteMetadata.title} />
      <StyledDiv>
        <main>{children}</main>
        <footer>
          <Footer />
        </footer>
      </StyledDiv>
    </Elements>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  isLoggedIn: PropTypes.bool,
}

export default Layout
