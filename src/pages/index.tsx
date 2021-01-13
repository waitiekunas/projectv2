import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Layout from '../components/Layout/layout';
import { MainBanner } from '../components/MainBanner/MainBanner';
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
  const dispatch = useDispatch()

  const handleCookieClick = useCallback(() => {
    setShowCookies(false)
  }, [showCookies])
  const findCookie = () => {
    if (localStorage.getItem("financeCookiesAgree") === "true") {
      return false
    }
    return true
  }
  console.log(language)
  return (
    <Layout>
      <SEO title="Home" />
      <MainBanner imageUri={"/images/index-photo.jpg"} />
      <ClassListFullContent />
      {showCookies && (
        <CookiesCont language={language} handleClick={handleCookieClick} />
      )}
    </Layout>
  )
}

export default IndexPage
