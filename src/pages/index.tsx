import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { Image } from '../components/Image/Image';
import Layout from '../components/Layout/layout';
import SEO from '../components/Seo/seo';
import ClassListFullContent from '../containers/ClassListFullContent/ClassListFullContent';
import { CookiesCont } from '../containers/CookiesCont/CookiesCont';
import { selectLanguage } from '../state/selectors/userData.selector';


export const IndexPage = () => {
  const language = useSelector(selectLanguage)
  const [showCookies, setShowCookies] = useState<boolean>(true)
  useEffect(() => {
    setShowCookies(findCookie())
  }, [])
  const handleCookieClick = useCallback(() => {
    setShowCookies(false)
  }, [showCookies])
  const findCookie = () => {
    if (localStorage.getItem("financeCookiesAgree") === "true") {
      return false
    }
    return true
  }
  return (
    <Layout>
      <SEO title="Home" />
      <Image
        imageUri={"/images/index-photo.jpg"}
        imgHeader={"Fact:"}
        imgText={
          "Size of the box and qtty of boxes as well as position can be adjusted"
        }
        showText={true}
      />
      <ClassListFullContent />
      {showCookies && (
        <CookiesCont language={language} handleClick={handleCookieClick} />
      )}
    </Layout>
  )
}


export default IndexPage
